import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";


export default function ShowBookList() {
  const apiUrl = import.meta.env.VITE_API_URL 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios
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
    return () => (mounted = false);
  }, [apiUrl]);

  if (loading) {
    return <div style={{ padding: 20 }}>Carregando livros...</div>;
  }

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">Books List</h1>
      <Link to="/create-book" className="add-book-btn">
        + Add New Book
      </Link>
      <div className="book-list-divider"></div>

      <div className="books-grid">
        {books.length === 0 ? (
          <div style={{ padding: 20 }}>Nenhum livro encontrado.</div>
        ) : (
          books.map((book) => (
            <div className="book-card" key={book._id ?? book.id}>
              <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
                alt="Books"
                height={200}
              />
              <div className="book-card-content">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.description}</p>
                <div style={{ marginTop: 8 }}>
                  <Link to={`/show-book/${book._id ?? book.id}`}>
                    <button className="btn">Show</button>
                  </Link>
                  <Link
                    to={`/edit-book/${book._id ?? book.id}`}
                    style={{ marginLeft: 8 }}
                  >
                    <button className="btn">Edit</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
