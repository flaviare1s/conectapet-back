import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository.js";

export const UserService = {
  createUser: async (data) => {
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("E-mail já cadastrado.");
    }

    const allowedRoles = ["user", "guardian"];
    if (!allowedRoles.includes(data.role)) {
      throw new Error("Perfil inválido.");
    }

    if (data.senha.length < 6) {
      const error = new Error("A senha deve conter no mínimo 6 caracteres");
      error.statusCode = 400;
      throw error;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.senha, saltRounds);
    data.senha = hashedPassword;

    return await UserRepository.create(data);
  },

  getAllUsers: async () => {
    return await UserRepository.findAll();
  },
};
