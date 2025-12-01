import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles.css";
import API from "../API";

function ShowBookDetails(props) {
  const apiUrl = import.meta.env.VITE_API_URL;  
  const [book, setBook] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowBookDetails");
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`${apiUrl}/api/books/${id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Error form ShowBookDetails_deleteClick");
      });
  };

  const BookItem = (
    <div>
      <table className="table-show-book datatable">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Author</td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>ISBN</td>
            <td>{book.isbn}</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Publisher</td>
            <td>{book.publisher}</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Published Date</td>
            <td>{book.published_date}</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Description</td>
            <td>{book.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="show-book-details">
      <Link to="/" className="link-show-book-list">
        <button type="button" className="btn-show-book-list btn">
          Show BooK List
        </button>
      </Link>

      <div className="book-detail-header">
        <h1 className="book-detail-header">Book's Record</h1>
        <p className="book-detail-text">View Book's Info</p>
        <br />
      </div>

      <div className="book-details">{BookItem}</div>
      <br />
      <div className="btn">
        <button
          type="button"
          className="btn-delete-book btn"
          onClick={() => {
            onDeleteClick(book._id);
          }}
        >
          Delete Book
        </button>

        <Link to={`/edit-book/${book._id}`}>
          <button type="button" className="btn-edit-book btn">
            Edit Book
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ShowBookDetails;
