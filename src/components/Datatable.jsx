import { Link, useNavigate } from "react-router-dom";
import "../styles.css";
import axios from "axios";

const Datatable = ({ books }) => {
  const apiUrl = import.meta.env.VITE_API_URL;  
  const navi = useNavigate();

  const onDeleteClick = (id) => {
    axios
      .delete(`${apiUrl}/api/books/${id}`)
      .then((res) => {
        navi("/");
      })
      .catch((err) => {
        console.log("Error form ShowBookDetails_deleteClick");
      });
  };

  return (
    <table className="datatable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Isbn</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => {
          return (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.isbn}</td>
              <td>{book.author}</td>
              <td>
                <Link to={`/show-book/${book._id}`}>
                  <button type="button" className="btn-show-book btn">
                    Show
                  </button>
                </Link>

                <Link to={`/edit-book/${book._id}`}>
                  <button type="button" className="btn-edit-book btn">
                    Edit
                  </button>
                </Link>

                <button
                  className="btn-delete-book btn"
                  onClick={() => onDeleteClick(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Datatable;

/*
const BookCard = (props) => {
  const book = props.book;

  return (
    <div className='card-container'>
      <img
        src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
        alt='Books'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-book/${book._id}`}>{book.title}</Link>
        </h2>
        <h3>{book.author}</h3>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;

*/
