import { Router } from "express";
import { PetController } from "../controllers/pet.controller.js";
import { upload } from "../middlewares/pet.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

export const petRouter = Router();

/**
 * @swagger
 * /pets:
 *   post:
 *     tags:
 *       - Pets
 *     summary: Criação de novo pet
 *     description: Cria um novo pet (apenas para usuários guardian, com upload de imagem).
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               especie:
 *                 type: string
 *               raca:
 *                 type: string
 *               idade:
 *                 type: integer
 *               sexo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Pet criado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 */
petRouter.post("/", authenticate, authorizeRoles("guardian"), upload.single("imagem"), PetController.create);

/**
 * @swagger
 * /pets:
 *   get:
 *      tags:
 *       - Pets
 *     summary: Lista todos os pets
 *     responses:
 *       200:
 *         description: Lista de pets
 */
petRouter.get("/", PetController.getAll);

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     tags:
 *       - Pets
 *     summary: Busca um pet por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pet encontrado
 *       404:
 *         description: Pet não encontrado
 */
petRouter.get("/:id", PetController.getById);

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     tags:
 *       - Pets
 *     summary: Atualiza um pet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               especie:
 *                 type: string
 *               raca:
 *                 type: string
 *               idade:
 *                 type: integer
 *               sexo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Pet atualizado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Pet não encontrado
 */
petRouter.put("/:id", authenticate, authorizeRoles("guardian"), upload.single("imagem"), PetController.update);

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     tags:
 *       - Pets
 *     summary: Deleta um pet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pet deletado
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Pet não encontrado
 */
petRouter.delete("/:id", authenticate, authorizeRoles("guardian"), PetController.delete);

/**
 * @swagger
 * /pets/{id}:
 *   patch:
 *     tags:
 *       - Pets
 *     summary: Atualiza status do pet
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
 *         description: Status atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Pet não encontrado
 */
petRouter.patch("/:id", PetController.updateStatus);

export default petRouter;
