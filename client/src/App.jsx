import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "./styles.css";

import CreateBook from "./components/CreateBook";
import ShowBookList from "./components/ShowBookList";
import ShowBookDetails from "./components/ShowBookDetails";
import UpdateBookInfo from "./components/UpdateBookInfo";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

function Icon({ emoji }) {
  return (
    <span className="icon" aria-hidden="true" style={{ fontSize: 18 }}>
      {emoji}
    </span>
  );
}

function DashboardLayout() {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["token"]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">▦</div>
          Dashboard
        </div>
        <nav className="menu">
          <ul>
            <li onClick={() => navigate("/")}>
              <Icon emoji="🏠" /> Home
            </li>
            <li onClick={() => navigate("/show-book")}>
              <Icon emoji="📚" /> Livros
            </li>
            <li onClick={() => navigate("/create-book")}>
              <Icon emoji="➕" /> Novo Livro
            </li>
            <li>
              <Icon emoji="👤" /> Profile
            </li>
            <li>
              <Icon emoji="💬" /> Messages
            </li>
            <li>
              <Icon emoji="🕘" /> History
            </li>
            <li>
              <Icon emoji="📋" /> Tasks
            </li>
            <li>
              <Icon emoji="👥" /> Communities
            </li>
            <li>
              <Icon emoji="⚙️" /> Settings
            </li>
            <li>
              <Icon emoji="❓" /> Support
            </li>
            <li>
              <Icon emoji="🔒" /> Privacy
            </li>
          </ul>
        </nav>
      </aside>

      <div className="content">
        <header className="topbar">
          <div className="search">
            <input placeholder="Search..." />
          </div>
          <div className="topbar-right">
            <button className="btn">New</button>
            <button className="btn">Upload</button>
            <div className="avatar" onClick={handleLogout}>
              MN
            </div>
          </div>
        </header>

        <main className="main-area">
          <section className="library-panel">
            <div className="header-strip">
              <h2>Livros</h2>
            </div>

            <div className="library-content">
              <div className="library-left"></div>
              <div className="book-list-wrapper">
                <Outlet />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const handleError = (err) =>
    setTimeout(() => {
      toast.error(err, {
        position: "bottom-left",
      });
    }, 1000);

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/show-book" element={<ShowBookList />} />
          <Route path="/create-book" element={<CreateBook />} />

          <Route
            element={
              <ProtectedRoute
                handleError={handleError}
                allowedRoles={["admin", "manager", "user"]}
              />
            }
          >
            <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
          </Route>

          <Route path="/show-book/:id" element={<ShowBookDetails />} />
        </Route>
      </Routes>

      <ToastContainer />
    </Router>
  );
}
