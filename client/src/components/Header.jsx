import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Header({ toggleSidebar, setIsAuth }) {
  // 🔹 RECEBE setIsAuth
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔹 Remove autenticação
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // 🔹 Atualiza estado global
    setIsAuth(false);

    // 🔹 Redireciona
    navigate("/login");
  };

  return (
    <header className="header_nav">
      <div className="header_left">
        <p className="header-btn" onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </p>
      </div>

      <h2>MEU APLICATIVO MARAVILHOSO</h2>

      <button className="header-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
