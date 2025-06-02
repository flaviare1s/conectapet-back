import authService from "../services/auth.service.js";

export async function loginController(req, res, next) {
  try {
    const { email, senha } = req.body;
    const { token } = await authService.login(email, senha);
    res.json({ token });
  } catch (error) {
    next(error);
  }
}
