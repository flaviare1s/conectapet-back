import { UserService } from "../services/user.service.js";
import { sendVerificationEmail } from "../services/email.service.js";
import { User } from "../models/user.model.js";
import crypto from "crypto";

export const UserController = {
  async create(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(_req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async requestVerification(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }

      if (user.emailVerified) {
        return res.status(400).json({ error: "Email já verificado!" });
      }

      const verificationCode = crypto.randomInt(100000, 999999).toString();
      const codeExpiration = new Date(Date.now() + 20 * 60 * 1000);

      await user.update({
        verificationCode,
        codeExpiration,
      });

      const emailSent = await sendVerificationEmail(email, verificationCode);
      if (!emailSent) {
        return res.status(400).json({ error: "Erro ao enviar verificação!" });
      }

      res.json({ message: "Código de verificação enviado!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async verifyEmail(req, res) {
    try {
      const { email, verificationCode } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }

      if (user.emailVerified) {
        return res.status(400).json({ error: "Email já verificado!" });
      }

      if (user.verificationCode !== verificationCode) {
        return res.status(401).json({ error: "Código inválido!" });
      }

      if (new Date() > user.codeExpiration) {
        return res.status(401).json({ error: "Código expirado!" });
      }

      await user.update({
        emailVerified: true,
        verificationCode: null,
        codeExpiration: null,
      });
      res.json({ message: "Email verificado com sucesso!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await UserService.updateUser(req.params.id, req.body);
      if (updated === null) {
        const exists = await UserService.getUserById(req.params.id);
        if (!exists) {
          return res.status(404).json({ error: "Usuário não encontrado!" });
        }
        return res.status(400).json({ error: "Nenhuma alteração realizada. Envie dados válidos para atualizar." });
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await UserService.deleteUser(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
}
