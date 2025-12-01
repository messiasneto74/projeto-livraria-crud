import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../API";
import "../styles.css";

import { useNavigate } from "react-router-dom";

const CreateBook = (props) => {
  // Define the state with useState hook
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: "",
    publisher: "",
  });

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/api/books`, book)
      .then((res) => {
        setBook({
          title: "",
          isbn: "",
          author: "",
          description: "",
          published_date: "",
          publisher: "",
        });

        // Push to /
        navigate("/");
      })
      .catch((err) => {
        console.log("Error in CreateBook!");
      });
  };

  return (
    <div className="createbook">
      <Link to="/" className="link-show-book-list">
        <button type="button" className="btn-show-book-list btn">
          Show BooK List
        </button>
      </Link>

      <div className="createbook-header">
        <h1 className="createbook-title">Add Book</h1>
        <p className="createbook-text">Create new book</p>
      </div>
      <br />
      <form className="form" noValidate onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title of the Book"
            name="title"
            className="form-control"
            value={book.title}
            onChange={onChange}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="text"
            placeholder="ISBN"
            name="isbn"
            className="form-control"
            value={book.isbn}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Author"
            name="author"
            className="form-control"
            value={book.author}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Describe this book"
            name="description"
            className="form-control"
            value={book.description}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="date"
            placeholder="published_date"
            name="published_date"
            className="form-control"
            value={book.published_date}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Publisher of this Book"
            name="publisher"
            className="form-control"
            value={book.publisher}
            onChange={onChange}
          />
        </div>

        <input type="submit" className="form-submit btn" />
      </form>
    </div>
  );
};

export default CreateBook;
