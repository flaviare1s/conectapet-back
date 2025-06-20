import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const userRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
userRouter.get("/", UserController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca um usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.get("/:id", UserController.getById);

/**
 * @swagger
 * /users/request-verification:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Criação de novo usuário (inicia fluxo de verificação de e-mail)
 *     description: Cria um novo usuário pendente e envia código de verificação para o e-mail informado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: PendingUser criado
 *       400:
 *         description: Dados inválidos ou e-mail já cadastrado
 */
userRouter.post('/request-verification', UserController.requestVerification);

/**
 * @swagger
 * /users/verify-email:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Verifica o e-mail do PendingUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               verificationCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: E-mail verificado com sucesso
 *       400:
 *         description: Código inválido ou expirado
 *       404:
 *         description: PendingUser não encontrado
 */
userRouter.post('/verify-email', UserController.verifyEmail);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário
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
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.put("/:id", UserController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Deleta um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário deletado
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.delete("/:id", UserController.delete);

export default userRouter;
