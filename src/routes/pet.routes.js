import { Router } from "express";
import { PetController } from "../controllers/pet.controller.js";
import { upload } from "../middlewares/pet.middleware.js";

export const petRouter = Router();

petRouter.post("/", upload.single("image"), PetController.create);
petRouter.get("/", PetController.getAll);

export default petRouter;
