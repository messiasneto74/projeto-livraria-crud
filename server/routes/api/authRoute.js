const express = require("express");
const router = express.Router();

const {
  Signup,
  Login,
  userVerification,
} = require("../../controllers/AuthController");

// rotas públicas
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/verify", userVerification);

module.exports = router;
