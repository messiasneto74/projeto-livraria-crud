const express = require("express");
const router = express.Router();

const { Signup, Login } = require("../../controllers/AuthController");
const { captchaMiddleware } = require("../../middlewares/captchaMiddleware");

router.post("/signup", captchaMiddleware, Signup);
router.post("/login", Login);

module.exports = router;
