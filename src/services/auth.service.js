import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";

const jwtSecret = process.env.JWT_SECRET;
const tokenExpiration = process.env.JWT_EXPIRATION;

async function login(email, senha) {
  const user = await UserRepository.findByEmail(email);

  if (!user) {
    const error = new Error("Email ou senha inválidos");
    error.statusCode = 401;
    throw error;
  }

  const senhaValida = await bcrypt.compare(senha, user.senha);

  if (!senhaValida) {
    const error = new Error("Email ou senha inválidos");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: tokenExpiration }
  );

  return { token };
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (err) {
    const authError = new Error(
      err.name === "TokenExpiredError" ? "Token expirado!" : "Token inválido!"
    );
    authError.statusCode = 401;
    throw authError;
  }
}

export default {
  login,
  verifyToken,
};
