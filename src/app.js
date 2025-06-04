import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import petRouter from "./routes/pet.routes.js";
import path from "path";
import adoptionRouter from "./routes/adoption.routes.js";

export const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

app.use('/users', userRouter);
app.use("/login", authRouter);
app.use("/pets", petRouter);
app.use("/adoptions", adoptionRouter);
        