import { app } from "./app.js";
import { connection } from "./config/database.js";
import './models/index.js';
import fs from "fs";
import path from "path";

const PORT = 4000;

const uploadDir = path.resolve("./uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const startServer = async () => {
  try {
    await connection.authenticate();
    await connection.sync({ force: false });
    console.log("Tabelas criadas ou verificadas com sucesso!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor!", error);
    process.exit(1);
  }
};

startServer();
