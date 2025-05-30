import { seedUsers } from "./src/seeders/userSeed.js";
import { connection } from "./src/config/database.js";

async function runSeed() {
  try {
    await connection.authenticate();
    console.log("Conexão com o banco OK");

    await seedUsers();

    console.log("Seed executada com sucesso");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao rodar seed:", error);
    process.exit(1);
  }
}

runSeed();
