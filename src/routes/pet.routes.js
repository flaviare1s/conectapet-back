import { Router } from "express";
import { PetController } from "../controllers/pet.controller.js";
import { upload } from "../middlewares/pet.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

export const petRouter = Router();

petRouter.post("/", upload.single("imagem"), PetController.create);
petRouter.get("/", PetController.getAll);
petRouter.get("/:id", PetController.getById);
petRouter.put("/:id", upload.single("imagem"), PetController.update);
petRouter.delete("/:id", PetController.delete);

export default petRouter;
