const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const booksRoutes = require("./routes/api/books");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/api/authRoute");

// Express app
const app = express();

// Conecta o banco de dados
connectDB();

// ==========================
// MIDDLEWARES
// ==========================
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://projeto-livraria-crud-client.onrender.com",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

// ==========================
// ROTAS
// ==========================

// Auth (públicas)
app.use("/auth", authRoute);

// Books (protegidas depois, se quiser)
app.use("/api/books", booksRoutes);

// ==========================
// HEALTH CHECK (IMPORTANTE)
// ==========================
app.get("/", (req, res) => {
  res.json({ status: "Server running" });
});

// ==========================
const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
