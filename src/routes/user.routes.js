import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/", UserController.create);
userRouter.get("/", UserController.getAll);
userRouter.get("/:id", UserController.getById);
userRouter.post('/request-verification', UserController.solicitarVerificacaoemail);
userRouter.post('/verify-email', UserController.verificarEmail);
userRouter.put("/:id", UserController.update);
userRouter.delete("/:id", UserController.delete);

export default userRouter;
