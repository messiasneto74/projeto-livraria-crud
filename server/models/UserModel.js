const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },

  username: {
    type: String,
    required: [true, "Your username is required"],
  },

  password: {
    type: String,
    required: [true, "Your password is required"],
  },

  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  // 🔐 VERIFICAÇÃO DE E-MAIL
  emailVerified: {
    type: Boolean,
    default: false,
  },

  emailVerificationCode: {
    type: String,
  },

  emailVerificationExpires: {
    type: Date,
  },

  // 🔁 RESET DE SENHA (para o futuro)
  resetPasswordCode: {
    type: String,
  },
});

// 🔥 IMPORTANTE: só criptografa a senha se ela for modificada
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
