import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pagestyles.css";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha email e senha");
      return;
    }

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuth(true);

      toast.success("Login realizado com sucesso!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erro ao conectar com o servidor"
      );
    }
  };

  useEffect(() => {
    document.body.className = "login-page";
    return () => (document.body.className = "");
  }, []);

  return (
    <div className="container_auth">
      <div className="form_container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>

          <span>
            Não tem conta? <Link to="/signup">Cadastrar</Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
