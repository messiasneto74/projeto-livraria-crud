import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pagestyles.css";

const Signup = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // SUBMIT SIGNUP
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      const { data } = await API.post(
        "/auth/signup",
        { email, password, username },
        { withCredentials: true }
      );

      console.log("RESPOSTA SIGNUP ===>", data);

      if (!data?.success) {
        toast.error(data?.message || "Erro ao criar conta");
        return;
      }

      // ✅ guarda email para verificação
      localStorage.setItem("pendingEmail", JSON.stringify(email));

      toast.success("Conta criada! Verifique seu e-mail 📧");

      // ✅ redireciona para verificação
      navigate("/verify-email", { replace: true });
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Erro ao conectar com o servidor"
      );
    }
  };

  // ==========================
  // ESTILO DA PÁGINA
  // ==========================
  useEffect(() => {
    document.body.className = "signup-page";
    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <div className="container_auth">
      <div className="form_container">
        <h2>Criar conta</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={handleOnChange}
            />
          </div>

          <button type="submit">Cadastrar</button>

          <span>
            Já tem conta? <Link to="/login">Login</Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
