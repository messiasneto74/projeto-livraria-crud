const { Signup, Login } = require("../../controllers/AuthController");
const { userVerification } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;
