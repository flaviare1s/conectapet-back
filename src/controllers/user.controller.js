import { UserService } from "../services/user.service.js";

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

  async update(req, res) {
    try {
      const updated = await UserService.updateUser(req.params.id, req.body);
      if (updated === null) {
        // Nenhuma linha afetada: pode ser id inexistente ou body vazio
        // Verifica se o usuário existe
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
};
