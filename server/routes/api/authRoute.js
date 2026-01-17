const express = require("express");
const router = express.Router();

const {login, signup, verifyUser,} = require("../../controllers/AuthController");

const { tokenVerification } = require("../../middlewares/authMiddleware");

// rotas públicas
router.post("/login", login);
router.post("/signup", signup);

// rota protegida
router.get("/verify", tokenVerification, verifyUser);

module.exports = router;
