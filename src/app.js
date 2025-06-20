import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import petRouter from "./routes/pet.routes.js";
import path from "path";
import adoptionRouter from "./routes/adoption.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js"

export const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Conectapet API",
    version: "1.0.0",
    description: "Documentação da API Conectapet",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // ajuste o caminho conforme sua estrutura
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/pet-seeds-img", express.static(path.resolve("pet-seeds-img")));

app.use('/users', userRouter);
app.use("/login", authRouter);
app.use("/pets", petRouter);
app.use("/adoptions", adoptionRouter);

// Middleware de tratamento de erros
app.use(errorHandler);