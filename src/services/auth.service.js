import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";

const jwtSecret = process.env.JWT_SECRET;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION || "1h";
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || "1d";

function generateTokens(user) {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: accessTokenExpiration }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: refreshTokenExpiration }
  );

  return { accessToken, refreshToken };
}

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

  return generateTokens(user);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    const authError = new Error(
      err.name === "TokenExpiredError" ? "Token expirado!" : "Token inválido!"
    );
    authError.statusCode = 401;
    throw authError;
  }
}

function refreshToken(oldToken) {
  try {
    const decoded = jwt.verify(oldToken, jwtSecret);
    return generateTokens(decoded);
  } catch (err) {
    const error = new Error("Refresh token inválido ou expirado");
    error.statusCode = 401;
    throw error;
  }
}

export default {
  login,
  verifyToken,
  refreshToken,
};
