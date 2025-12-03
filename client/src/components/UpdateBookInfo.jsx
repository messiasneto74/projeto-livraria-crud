import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../API";
import "../styles.css";

export default function UpdateBookInfo() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8082";
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: "",
    publisher: "",
  });

  // Buscar dados do livro
  useEffect(() => {
    let mounted = true;

    API
      .get(`${apiUrl}/api/books/${id}`)
      .then((res) => {
        if (!mounted) return;
        const data = res.data || {};
        setBook({
          title: data.title || "",
          isbn: data.isbn || "",
          author: data.author || "",
          description: data.description || "",
          published_date: data.published_date || "",
          publisher: data.publisher || "",
        });
      })
      .catch((err) => {
        console.error("Error from UpdateBookInfo:", err);
        alert("Erro ao carregar o livro para edição.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [apiUrl, id]);

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    API
      .put(`${apiUrl}/api/books/${id}`, book)
      .then(() => {
        navigate(`/show-book/${id}`);
      })
      .catch((err) => {
        console.error("Error in UpdateBookInfo!", err);
        alert("Erro ao atualizar o livro.");
      });
  };

  if (loading) {
    return (
      <div className="book-list-container">
        <p>Carregando livro para edição...</p>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="book-list-title" style={{ textAlign: "left" }}>
          Edit Book
        </h2>
        <Link to="/">
          <button className="btn">Voltar</button>
        </Link>
      </div>

      <div className="book-list-divider" />

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={book.title}
            onChange={onChange}
            placeholder="Title of the book"
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            name="isbn"
            className="form-control"
            value={book.isbn}
            onChange={onChange}
            placeholder="ISBN"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={book.author}
            onChange={onChange}
            placeholder="Author"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={book.description}
            onChange={onChange}
            placeholder="Description of the book"
          />
        </div>

        <div className="form-group">
          <label htmlFor="published_date">Published Date</label>
          <input
            type="date"
            name="published_date"
            className="form-control"
            value={book.published_date}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            name="publisher"
            className="form-control"
            value={book.publisher}
            onChange={onChange}
            placeholder="Publisher of the book"
          />
        </div>

        <button type="submit" className="btn" style={{ marginTop: "12px" }}>
          Update Book
        </button>
      </form>
    </div>
  );
}

// --- IGNORE ---
