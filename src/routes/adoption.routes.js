import { Router } from "express";
import { AdoptionController } from "../controllers/adoption.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

export const adoptionRouter = Router();

/**
 * @swagger
 * /adoptions:
 *   post:
 *     tags:
 *       - Adoções
 *     summary: Solicitar adoção de pet
 *     description: Usuário solicita adoção de um pet.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Solicitação de adoção criada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 */
adoptionRouter.post("/", authenticate, authorizeRoles("user"), AdoptionController.create);

/**
 * @swagger
 * /adoptions:
 *   get:
 *     tags:
 *       - Adoções
 *     summary: Listar solicitações de adoção
 *     description: Guardian lista todas as solicitações de adoção.
 *     responses:
 *       200:
 *         description: Lista de solicitações de adoção
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 */
adoptionRouter.get("/", authenticate, authorizeRoles("guardian"), AdoptionController.getAll);

/**
 * @swagger
 * /adoptions/{id}:
 *   get:
 *     tags:
 *       - Adoções
 *     summary: Buscar solicitação de adoção por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Solicitação encontrada
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Solicitação não encontrada
 */
adoptionRouter.get(":id", authenticate, authorizeRoles("guardian"), AdoptionController.getById);

/**
 * @swagger
 * /adoptions/{id}:
 *   put:
 *     tags:
 *       - Adoções
 *     summary: Atualizar solicitação de adoção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitação atualizada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Solicitação não encontrada
 */
adoptionRouter.put(":id", authenticate, authorizeRoles("guardian"), AdoptionController.update);

/**
 * @swagger
 * /adoptions/{id}:
 *   delete:
 *     tags:
 *       - Adoções
 *     summary: Deletar solicitação de adoção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Solicitação deletada
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Solicitação não encontrada
 */
adoptionRouter.delete(":id", authenticate, authorizeRoles("guardian"), AdoptionController.delete);

export default adoptionRouter;
