import { Router } from "express";
import { loginController, refreshTokenController } from "../controllers/auth.controller.js";

export const authRouter = Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Login do usuário
 *     description: Realiza login e retorna token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 */
authRouter.post("/", loginController);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Refresh do token JWT
 *     description: Gera um novo token JWT a partir de um refresh token válido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Novo token gerado
 *       400:
 *         description: Refresh token inválido
 */
authRouter.post("/refresh-token", refreshTokenController);


export default authRouter;
