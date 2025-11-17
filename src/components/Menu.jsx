import { RiCloseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Menu({ toggleSidebar }) {
  return (
    <div className="menu">
      <span className="menu-btn" onClick={toggleSidebar}>
        <RiCloseLargeFill />
      </span>
      <h1 className="logo">LOGO</h1>
      <nav>
        <li>
          <Link to="/">⭐ - Show BooK List</Link>
        </li>
        <li>
          <Link to="/create-book">🦸🏽‍♂️ - Add New Book</Link>
        </li>
        <li>
          <Link to="">🖌️ - Novo Link 1</Link>
        </li>
        <li>
          <Link to="">👌🏽 - Novo Link 2</Link>
        </li>
      </nav>
    </div>
  );
}

export default Menu;
