import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

export const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use('/users', userRouter);
app.use("/login", authRouter);
