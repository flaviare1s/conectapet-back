import { Router } from "express";
import { PetController } from "../controllers/pet.controller.js";
import { upload } from "../middlewares/pet.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

export const petRouter = Router();

petRouter.post("/", authenticate, authorizeRoles("guardian"), upload.single("imagem"), PetController.create);
petRouter.get("/", PetController.getAll);
petRouter.get("/:id", PetController.getById);
petRouter.put("/:id", authenticate, authorizeRoles("guardian"), upload.single("imagem"), PetController.update);
petRouter.delete("/:id", authenticate, authorizeRoles("guardian"), PetController.delete);

export default petRouter;
