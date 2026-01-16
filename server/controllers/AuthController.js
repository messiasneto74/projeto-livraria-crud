const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/SecretToken");
const sendEmail = require("../util/sendEmail");

// ==========================
// SIGNUP
// ==========================
module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // 🔐 gera código de 6 dígitos
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const verificationExpires = Date.now() + 15 * 60 * 1000; // 15 minutos

    const user = await User.create({
      email,
      password,
      username,
      emailVerified: false,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: verificationExpires,
    });

    // 📧 envia email
    console.log("ENVIANDO EMAIL PARA:", email);
    await sendEmail({
      to: email,
      subject: "🔐 Código de acesso da sua Livraria",
      html: `
    <div style="font-family: Arial; max-width: 500px">
      <h2>Livraria 📚</h2>
      <p>Seu código de verificação:</p>
      <h1 style="letter-spacing: 4px">${verificationCode}</h1>
      <p>Válido por 15 minutos.</p>
    </div>
  `,
    });
      console.log("EMAIL ENVIADO");


    res.status(201).json({
      success: true,
      message: "Conta criada. Verifique seu e-mail.",
      email,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==========================
// LOGIN
// ==========================
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // 🔒 bloqueia login sem email verificado
    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Confirme seu e-mail antes de fazer login",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });


    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==========================
// VERIFY EMAIL
// ==========================
module.exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or code",
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    if (
      user.emailVerificationCode !== code ||
      user.emailVerificationExpires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired code",
      });
    }

    user.emailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
