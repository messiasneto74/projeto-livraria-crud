const express = require('express');

const router = express.Router();

// Carrega o Book Model (schema)
const Book = require('../../models/Book');

//GET api/books/test
//teste de rota livros
router.get('/test', (req, res) => res.send({ msg: 'Testando rota book' }));


//GET api/books
//pegar todos os livros

router.get('/', (req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(404).json({ nobooksfound: 'Nenhum livro encontrado' }));
});

//GET api/books/:id
//Pegar unico livro por ID

router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(404).json({ nobooksfound: 'Nenhum livro encontrado' }));
});

//POST api/books
//Adicionar/Salvar livro

router.post('/', (req, res) => {
    Book.create(req.body)
        .then(book => res.json({msg: 'Livro adicionado com sucesso'}))
        .catch(err => res.status(404).json({ error: 'Não foi possivel adicionar esse livro' }));
});

//PUT api/books/:id
//Atualizar o Livro

router.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.json({msg: 'Livro atualizado com sucesso'}))
        .catch(err => res.status(404).json({ error: 'Não foi possivel atualizar a base de dados' }));
});

//DELETE api/books/:id
//Deletar o Livro por id

router.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id, req.body)
        .then(book => res.json({msg: 'Livro deletado com sucesso'}))
        .catch(err => res.status(404).json({ error: 'Não existe esse livro' }));
});

module.exports = router;