import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function seedUsers() {
  const senhaHash = await bcrypt.hash("senha123", 10);

  const users = [
    {
      nome: "João Silva",
      email: "joao.silva@example.com",
      senha: senhaHash,
      role: "user",
    },
    {
      nome: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      senha: senhaHash,
      role: "guardian",
    },
  ];

  for (const user of users) {
    const [obj, created] = await User.findOrCreate({
      where: { email: user.email },
      defaults: user,
    });
    if (created) {
      console.log(`Usuário ${user.email} criado`);
    } else {
      console.log(`Usuário ${user.email} já existe`);
    }
  }
}
