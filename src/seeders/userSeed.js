import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function seedUsers() {
  const senhaHash = await bcrypt.hash("123456", 10);

  const users = [
    {
      nome: "João Silva",
      email: "joao@teste.com",
      senha: senhaHash,
      role: "user",
      emailVerified: true,
    },
    {
      nome: "ONG 1",
      email: "ong1@teste.com",
      senha: senhaHash,
      role: "guardian",
      emailVerified: true,
    },
    {
      nome: "Maria de Sousa",
      email: "maria@teste.com",
      senha: senhaHash,
      role: "user",
      emailVerified: true,
    },
    {
      nome: "ONG 2",
      email: "ong2@teste.com",
      senha: senhaHash,
      role: "guardian",
      emailVerified: true,
    },
    {
      nome: "ONG 3",
      email: "ong3@teste.com",
      senha: senhaHash,
      role: "guardian",
      emailVerified: true,
    },
    {
      nome: "ONG 4",
      email: "ong4@teste.com",
      senha: senhaHash,
      role: "guardian",
      emailVerificado: true,
    },
  ];

  for (const user of users) {
    const [obj, created] = await User.findOrCreate({
      where: { email: user.email },
      defaults: user,
    });
    if (created) {
      console.log(`Usuário ${user.email} criado`);
    } else if (obj.emailVerified !== true) {
      await obj.update({ emailVerified: true });
      console.log(`Usuário ${user.email} já existe, emailVerified atualizado para true`);
    } else {
      console.log(`Usuário ${user.email} já existe e já está verificado`);
    }
  }
}
