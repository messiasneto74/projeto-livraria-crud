const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const booksRoutes = require("./routes/api/books");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/api/authRoute");
const { tokenVerification } = require("./middlewares/authMiddleware");

//Express app
const app = express();

//Conecta o banco de dados
connectDB();

//Middleware
app.use(express.json({ extended: false }));
//app.get('/', (req, res) => res.send('Hello world!'));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/auth", authRoute);

//Routes
app.use("/api/books", tokenVerification, booksRoutes);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port} `));
