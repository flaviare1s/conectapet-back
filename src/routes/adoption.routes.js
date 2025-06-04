import { Router } from "express";
import { AdoptionController } from "../controllers/adoption.controller.js";

export const adoptionRouter = Router();

adoptionRouter.post("/", AdoptionController.create);
adoptionRouter.get("/", AdoptionController.getAll);
adoptionRouter.get("/:id", AdoptionController.getById);
adoptionRouter.put("/:id", AdoptionController.update);
adoptionRouter.delete("/:id", AdoptionController.delete);

export default adoptionRouter;
