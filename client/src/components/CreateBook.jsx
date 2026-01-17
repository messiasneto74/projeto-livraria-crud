import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import "../styles.css";
import { fetchBookFromGoogle } from "../services/googleBooks";

const CreateBook = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // 🔹 estados CORRETOS
  const [isbn, setIsbn] = useState("");
  const [cover, setCover] = useState("");

  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    published_date: "",
    publisher: "",
  });

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // 🔹 busca dados na Google Books
  const handleISBNBlur = async () => {
    if (!isbn) return;

    const data = await fetchBookFromGoogle(isbn);

    if (data) {
      setBook((prev) => ({
        ...prev,
        title: data.title || "",
        author: data.author || "",
        description: data.description || "",
        publisher: data.publisher || "",
        isbn,
        cover: data.thumbnail || "",
      }));

      setCover(data.thumbnail || "");
    }
  };


  // 🔹 ENVIO FINAL (AQUI VAI A CAPA)
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`${apiUrl}/api/books`, {
        ...book,
        isbn,
        cover, // 🔥 A CAPA VAI AQUI
      });

      navigate("/");
    } catch (err) {
      console.error("Erro ao criar livro:", err);
    }
  };

  return (
    <div className="createbook">
      <Link to="/" className="link-show-book-list">
        <button type="button" className="btn-show-book-list btn">
          Show Book List
        </button>
      </Link>

      <div className="createbook-header">
        <h1 className="createbook-title">Add Book</h1>
        <p className="createbook-text">Create new book</p>
      </div>

      <form className="form" noValidate onSubmit={onSubmit}>
        {/* ISBN */}
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          onBlur={handleISBNBlur}
        />

        {/* CAPA DO LIVRO */}
        {cover && (
          <img
            src={cover}
            alt="Capa do livro"
            style={{ width: "150px", marginTop: "10px" }}
          />
        )}

        <input
          type="text"
          placeholder="Title of the Book"
          name="title"
          className="form-control"
          value={book.title}
          onChange={onChange}
        />

        <input
          type="text"
          placeholder="Author"
          name="author"
          className="form-control"
          value={book.author}
          onChange={onChange}
        />

        <input
          type="text"
          placeholder="Describe this book"
          name="description"
          className="form-control"
          value={book.description}
          onChange={onChange}
        />

        <input
          type="date"
          name="published_date"
          className="form-control"
          value={book.published_date}
          onChange={onChange}
        />

        <input
          type="text"
          placeholder="Publisher of this Book"
          name="publisher"
          className="form-control"
          value={book.publisher}
          onChange={onChange}
        />

        <input type="submit" className="form-submit btn" />
      </form>
    </div>
  );
};

export default CreateBook;
