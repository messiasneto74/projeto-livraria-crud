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
      subject: "🔐 Confirme seu e-mail – Livraria",
      html: `
    <div style="
      max-width: 520px;
      margin: 0 auto;
      font-family: Arial, Helvetica, sans-serif;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #eee;
    ">
      <div style="
        background: #1f2937;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      ">
        <h2 style="margin: 0;">📚 Livraria</h2>
      </div>

      <div style="padding: 24px; color: #111827;">
        <p>Olá 👋</p>

        <p>
          Recebemos um pedido para criar sua conta.
          Para confirmar seu e-mail, utilize o código abaixo:
        </p>

        <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 6px;
          text-align: center;
          margin: 24px 0;
          color: #111827;
        ">
          ${verificationCode}
        </div>

        <p style="text-align: center;">
          ou clique no botão abaixo:
        </p>

        <div style="text-align: center; margin: 24px 0;">
          <a
            href="${process.env.CLIENT_URL}/verify-email"
            style="
              background: #2563eb;
              color: #ffffff;
              padding: 14px 24px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
              display: inline-block;
            "
          >
            Confirmar e-mail
          </a>
        </div>

        <p style="font-size: 14px; color: #6b7280;">
          Este código expira em 15 minutos.<br />
          Se você não solicitou este cadastro, ignore este e-mail.
        </p>
      </div>

      <div style="
        background: #f9fafb;
        padding: 16px;
        text-align: center;
        font-size: 12px;
        color: #9ca3af;
      ">
        © ${new Date().getFullYear()} Livraria. Todos os direitos reservados.
      </div>
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
