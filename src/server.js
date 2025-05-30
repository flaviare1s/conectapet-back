import { app } from "./app.js";
import { connection } from "./config/database.js";
import './models/user.model.js';
import './models/pet.model.js';
import './models/adoption.model.js';

const PORT = 3000;

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
