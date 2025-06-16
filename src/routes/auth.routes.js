import { Router } from "express";
import { loginController, refreshTokenController } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/", loginController);
authRouter.post("/refresh-token", refreshTokenController);


export default authRouter;
