import authService from "../services/auth.service.js";

export async function loginController(req, res, next) {
  try {
    const { email, senha } = req.body;
    const tokens = await authService.login(email, senha);
    res.json(tokens);
  } catch (error) {
    next(error);
  }
}

export async function refreshTokenController(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const tokens = authService.refreshToken(refreshToken);
    res.json(tokens);
  } catch (error) {
    next(error);
  }
}
