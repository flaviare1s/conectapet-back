import authService from "../services/auth.service.js";

export function authenticate(req, _res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new Error("Token não fornecido");
      error.statusCode = 401;
      throw error;
    }

    const [scheme, token] = authHeader.split(" ");
    if (!/^Bearer$/i.test(scheme) || !token) {
      const error = new Error("Token mal formatado");
      error.statusCode = 401;
      throw error;
    }

    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
}

export function authorizeRoles(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      const error = new Error("Acesso não autorizado");
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
}
