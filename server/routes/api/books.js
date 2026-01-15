const express = require("express");
const router = express.Router();

// Carrega o Book Model (schema)
const Book = require("../../models/Book");

// Middleware de autenticação
const { tokenVerification } = require("../../middlewares/authMiddleware");

// ============================
// TESTE DE ROTA
// ============================
router.get("/test", (req, res) => res.send({ msg: "Testando rota book" }));

// ============================
// ROTAS PÚBLICAS
// ============================

// GET api/books
// Pegar todos os livros
router.get("/", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch(() =>
      res.status(404).json({ nobooksfound: "Nenhum livro encontrado" })
    );
});

// GET api/books/:id
// Pegar livro por ID
router.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch(() =>
      res.status(404).json({ nobooksfound: "Nenhum livro encontrado" })
    );
});

// ============================
// ROTAS PROTEGIDAS
// ============================

// POST api/books
// Adicionar livro
router.post("/", tokenVerification, (req, res) => {
  Book.create(req.body)
    .then(() => res.json({ msg: "Livro adicionado com sucesso" }))
    .catch(() =>
      res.status(400).json({ error: "Não foi possível adicionar esse livro" })
    );
});

// PUT api/books/:id
// Atualizar livro
router.put("/:id", tokenVerification, (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Livro atualizado com sucesso" }))
    .catch(() =>
      res
        .status(400)
        .json({ error: "Não foi possível atualizar a base de dados" })
    );
});

// DELETE api/books/:id
// Deletar livro
router.delete("/:id", tokenVerification, (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Livro deletado com sucesso" }))
    .catch(() => res.status(404).json({ error: "Não existe esse livro" }));
});

module.exports = router;
