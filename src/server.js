import { app } from "./app.js";
import { connection, authenticate } from "./config/database.js";

const PORT = 3000;

const startServer = async () => {
  try {
    await authenticate(connection);
    await connection.sync();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor!", error);
    process.exit(1);
  }
};

startServer();
