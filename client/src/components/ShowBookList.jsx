import { useState, useEffect } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { fetchBookFromGoogle } from "../services/googleBooks";
import Datatable from "./Datatable";
import API from "../API";

export default function ShowBookList() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8082";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    API
      .get(`${apiUrl}/api/books`)
      .then((res) => {
        if (mounted) setBooks(res.data || []);
      })
      .catch((err) => {
        console.error("Erro ao buscar livros:", err);
        if (mounted) setBooks([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  const handleDelete = (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este livro?")) return;

    API
      .delete(`${apiUrl}/api/books/${id}`)
      .then(() => {
        setBooks((prev) => prev.filter((b) => (b._id ?? b.id) !== id));
      })
      .catch((err) => {
        console.error("Erro ao deletar livro:", err);
        alert("Erro ao deletar o livro.");
      });
  };

  if (loading) {
    return (
      <div className="book-list-container">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      <h2 className="book-list-title">Books List</h2>

      <Link to="/create-book" className="add-book-btn">
        + Add New Book
      </Link>

      <div className="book-list-divider" />

      {books.length === 0 ? (
        <div className="book-list-empty">Nenhum livro encontrado.</div>
      ) : (
        <div className="books-grid">
          {books.map((book) => {
           <img
             src={
               book.cover || "https://via.placeholder.com/150x220?text=Sem+Capa"
             }
             alt={book.title}
             style={{ width: "120px" }}
           />;

            return (
              <div className="book-card" key={id}>
                <img
                  src={coverSrc}
                  alt="Book Cover"
                  onError={(e) => {
                    e.currentTarget.src = "./public/img/book.jpg";
                  }}
                />

                <div className="book-card-content">
                  <h3>{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-desc">{book.description}</p>

                  <div className="book-card-actions">
                    <Link to={`/show-book/${id}`}>
                      <button className="btn">Show</button>
                    </Link>
                    <Link to={`/edit-book/${id}`}>
                      <button className="btn">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
