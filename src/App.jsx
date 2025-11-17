import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import CreateBook from "./components/CreateBook";
import ShowBookList from "./components/ShowBookList";
import ShowBookDetails from "./components/ShowBookDetails";
import UpdateBookInfo from "./components/UpdateBookInfo";

function Icon({ emoji }) {
  return (
    <span className="icon" aria-hidden="true" style={{ fontSize: 18 }}>
      {emoji}
    </span>
  );
}

export default function App() {
  return (
    <Router>
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <div className="brand">
            <div className="logo">▦</div>Dashboard
          </div>
          <nav className="menu">
            <ul>
              <li>
                <Icon emoji="🏠" /> Home
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
              <div className="avatar">MN</div>
            </div>
          </header>

          <main className="main-area">
            <section className="library-panel">
              <div className="header-strip">
                <h2>Livros</h2>
              </div>

              {/* conteúdo interno do painel cinza */}
              <div className="library-content">
                {/* área esquerda (espaço livre/banners/cards etc.) */}
                <div className="library-left">
                  {/* Você pode colocar aqui um banner, estatísticas, etc. */}
                </div>

                {/* wrapper à direita: dentro daqui as rotas relacionadas a livros aparecerão */}
                <div className="book-list-wrapper">
                  <Routes>
                    {/* rota principal: lista de livros */}
                    <Route path="/" element={<ShowBookList />} />

                    {/* criar, editar e ver detalhes também aparecem dentro deste card (mesmo wrapper) */}
                    <Route path="/create-book" element={<CreateBook />} />
                    <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
                    <Route
                      path="/show-book/:id"
                      element={<ShowBookDetails />}
                    />
                  </Routes>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Router>
  );
}
