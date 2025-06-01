import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.post("/", UserController.create);
userRouter.get("/", UserController.getAll);
userRouter.get("/:id", authenticate, authorizeRoles("guardian"), UserController.getById); // Exemplo de rota protegida acessada apenas por guardians

export default userRouter;
