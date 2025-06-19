import { UserService } from "../services/user.service.js";
import { sendVerificationEmail } from "../services/email.service.js";
import { User } from "../models/user.model.js";
import { PendingUser } from "../models/pendingUser.model.js";
import { userUpdateValidation } from "../utils/validations.js";
import bcrypt from "bcrypt";
import { pendingUserValidation } from "../utils/validations.js";

function generateVerificationData() {
  return {
    verificationCode: Math.floor(100000 + Math.random() * 900000).toString(),
    codeExpiration: new Date(Date.now() + 20 * 60 * 1000),
  };
};

export const UserController = {
//   async create(req, res) {
//     const { error } = userValidation.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     try {
//       const user = await UserService.createUser(req.body);
//       res.status(201).json(user);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
  // },

export const UserController = {
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
      const { error } = pendingUserValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { nome, email, senha, role } = req.body;

      // Busca PendingUser uma única vez
      const pendingUser = await PendingUser.findOne({ where: { email } });
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.emailVerified) {
        return res
          .status(400)
          .json({ message: "Email já está cadastrado e verificado." });
      }

      const { verificationCode, codeExpiration } = generateVerificationData();
      if (pendingUser) {

        await pendingUser.update({ verificationCode, codeExpiration });
        const emailSent = await sendVerificationEmail(email, verificationCode);
        if (!emailSent) {
          return res
            .status(500)
            .json({ message: "Erro ao enviar o e-mail de verificação." });
        }
        return res
          .status(200)
          .json({ message: "Código reenviado para o e-mail." });
      }

      // Cria novo PendingUser (rota de criação de usuário)
      const senhaHash = await bcrypt.hash(senha, 10);
      const novoPendingUser = await PendingUser.create({
        nome,
        email,
        senha: senhaHash,
        role,
        verificationCode,
        codeExpiration,
        emailVerified: false,
      });
      const emailSent = await sendVerificationEmail(email, verificationCode);
      if (!emailSent) {
        await PendingUser.destroy({ where: { email } });
        return res
          .status(500)
          .json({ message: "Erro ao enviar o e-mail de verificação." });
      }
      return res.status(201).json({
        id: novoPendingUser.id,
        email: novoPendingUser.email,
        nome: novoPendingUser.nome,
        role: novoPendingUser.role,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  async verifyEmail(req, res) {
    try {
      const { email, verificationCode } = req.body;
      const pending = await PendingUser.findOne({ where: { email } });
      if (!pending) {
        return res
          .status(404)
          .json({ message: "Pré-cadastro não encontrado." });
      }
      if (
        pending.verificationCode !== verificationCode ||
        new Date() > new Date(pending.codeExpiration)
      ) {
        return res
          .status(400)
          .json({ message: "Código inválido ou expirado." });
      }

      // Antes de criar o usuário, verifica se já existe
      const existingUser = await User.findOne({ where: { email: pending.email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email já está cadastrado e verificado." });
      }
      const newUser = await User.create({
        nome: pending.nome,
        email: pending.email,
        senha: pending.senha,
        role: pending.role,
        emailVerified: true,
      });
      await pending.destroy();
      return res
        .status(201)
        .json({ message: "E-mail verificado com sucesso!", user: newUser });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  async update(req, res) {
    const { error } = userUpdateValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const updated = await UserService.updateUser(req.params.id, req.body);
      if (updated === null) {
        const exists = await UserService.getUserById(req.params.id);
        if (!exists) {
          return res.status(404).json({ error: "Usuário não encontrado!" });
        }
        return res
          .status(400)
          .json({
            error:
              "Nenhuma alteração realizada. Envie dados válidos para atualizar.",
          });
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
};
