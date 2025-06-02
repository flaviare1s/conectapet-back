import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/", UserController.create);
userRouter.get("/", UserController.getAll);
userRouter.get("/:id", UserController.getById);

export default userRouter;
