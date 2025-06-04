import { Router } from "express";
import { AdoptionController } from "../controllers/adoption.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

export const adoptionRouter = Router();

adoptionRouter.post("/", authenticate, authorizeRoles("user"), AdoptionController.create);
adoptionRouter.get("/", authenticate, authorizeRoles("guardian"), AdoptionController.getAll);
adoptionRouter.get("/:id", authenticate, authorizeRoles("guardian"), AdoptionController.getById);
adoptionRouter.put("/:id", authenticate, authorizeRoles("guardian"), AdoptionController.update);
adoptionRouter.delete("/:id", authenticate, authorizeRoles("guardian"), AdoptionController.delete);

export default adoptionRouter;
