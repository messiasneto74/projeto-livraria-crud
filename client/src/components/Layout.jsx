import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import "../styles.css";

function Layout({ setIsAuth }) {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔥 AQUI ESTÁ O CERTO
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.error("Erro ao ler usuário do localStorage");
      }
    }
  }, []); // só roda 1x ao carregar o Layout

  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const initials = getInitials(user?.username);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <Sidebar className="app">
        <Menu>
          <MenuItem className="menu1" onClick={() => collapseSidebar()}>
            <h2>Dashboard</h2>
          </MenuItem>

          <MenuItem component={<Link to="/" />}>🏠 Home</MenuItem>
          <MenuItem component={<Link to="/show-book" />}>📚 Livros</MenuItem>
          <MenuItem component={<Link to="/create-book" />}>
            ➕ Novo Livro
          </MenuItem>
        </Menu>
      </Sidebar>

      <div className="content-wrapper">
        <header className="topbar">
          <div className="search">
            <input placeholder="Search..." />
          </div>

          <div className="topbar-right">
            <button className="btn">New</button>
            <button className="btn">Upload</button>

            <div className="user-menu">
              <div
                className="avatar"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {initials}
              </div>

              {menuOpen && (
                <div className="user-menu-dropdown">
                  <div className="user-menu-header">
                    <div className="avatar">
                      {user?.photo ? (
                        <img src={user.photo} className="avatar-img" />
                      ) : (
                        initials
                      )}
                    </div>

                    <div>
                      <div className="user-menu-name">
                        {user?.username || "Usuário"}
                      </div>
                      <div className="user-menu-email">
                        {user?.email || "email@exemplo.com"}
                      </div>
                    </div>
                  </div>

                  <button
                    className="user-menu-item"
                    onClick={() => navigate("/profile")}
                  >
                    Meu Perfil
                  </button>

                  <button
                    className="user-menu-item"
                    onClick={() => alert("Configurações ainda em construção")}
                  >
                    Configurações
                  </button>

                  <button
                    className="user-menu-item logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
