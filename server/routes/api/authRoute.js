const {Signup, Login, verifyEmail,} = require("../../controllers/AuthController");

const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/verify-email", verifyEmail);

module.exports = router;
