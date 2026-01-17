const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
require("dotenv").config();

/**
 * Middleware para rotas protegidas
 */
const tokenVerification = (req, res, next) => {
  let token = null;

  // Header Authorization
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Cookie fallback
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Acesso negado. Token não fornecido.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded; // { id, role, ... }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido ou expirado.",
    });
  }
};

/**
 * Endpoint para verificar usuário logado
 * (uso em /auth/verify ou /auth/me)
 */
const userVerification = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.json({ success: false });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id).select("username role");

    if (!user) {
      return res.json({ success: false });
    }

    return res.json({
      success: true,
      user: user.username,
      role: user.role,
    });
  } catch (error) {
    return res.json({ success: false });
  }
};

module.exports = {
  tokenVerification,
  userVerification,
};
