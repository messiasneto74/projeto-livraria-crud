const {Signup, Login} = require("../../controllers/AuthController");

const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/", (req, res) => {
    const captcha = generateCaptcha();
    req.session.captchaAnswer = captcha.answer;

    res.json({
        question: captcha.question,
    });
});
module.exports = router;

