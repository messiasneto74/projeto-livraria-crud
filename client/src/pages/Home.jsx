import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifica se existe usuário logado
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error("Erro ao ler usuário:", err);
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return null; // Evita erro de renderização antes do carregamento
  }

  return (
    <div className="home-container">
      <h2 className="home-title">
        Bem-vindo(a), <span className="home-username">{user.username}</span> 👋
      </h2>

      <p className="home-subtitle">
        Use o menu lateral para acessar as funções da sua livraria.
      </p>

      <div className="home-cards">
        <div className="home-card" onClick={() => navigate("/show-book")}>
          📚 Ver Lista de Livros
        </div>

        <div className="home-card" onClick={() => navigate("/create-book")}>
          ➕ Adicionar Novo Livro
        </div>

        <div
          className="home-card"
          onClick={() => alert("Relatórios ainda em construção")}
        >
          📊 Relatórios
        </div>
      </div>
    </div>
  );
};

export default Home;
