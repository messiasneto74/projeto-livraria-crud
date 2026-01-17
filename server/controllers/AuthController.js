const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.Signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // 1️⃣ validação básica
    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Preencha todos os campos",
      });
    }

    // 2️⃣ verifica se usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email já cadastrado",
      });
    }

    // 3️⃣ 🔥 AQUI ENTRA O bcrypt.hash 🔥
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ cria usuário COM SENHA CRIPTOGRAFADA
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // 5️⃣ resposta
    res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Erro no servidor",
    });
  }
};
