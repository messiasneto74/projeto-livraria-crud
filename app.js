const express = require('express');

const connectDB = require ('./config/db');

const bookRouter = require('./routes/api/books');

const cors = require('cors');

require('dotenv').config();

const app = express();

//Middleware 
app.use(express.json({extended: false})); //esse codigo serve para ele ler o formato JSON
app.get('/', (req, res) => res.send ('Hello World!'));

// conecta o banco de dados
connectDB();

//Cors
app.use(cors({ origin: true, credentials: true }));

//Definindo as rotas
app.use('/api/books', bookRouter);

//Porta do servidor
const port = process.env.PORT || 8082;

app.listen(port, () => console.log (`Server Running on port ${port}`));