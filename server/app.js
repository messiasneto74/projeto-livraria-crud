const express = require('express');

const connectDB = require ('./config/db');

const bookRouter = require('./routes/api/books');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const authRoute = require("./routes/api/authRoute");

require('dotenv').config();

const app = express();

//Middleware 
app.use(express.json({extended: false})); //esse codigo serve para ele ler o formato JSON
app.get('/', (req, res) => res.send ('Hello World!'));

// conecta o banco de dados
connectDB();

//Cors
app.use(cors({ origin: true, credentials: true }));

//JWT
app.use(cookieParser());
app.use("/", authRoute);

//Definindo as rotas
app.use('/api/books', bookRouter);

//Porta do servidor
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server Running on port ${port}`));

// exportando o app para o teste
