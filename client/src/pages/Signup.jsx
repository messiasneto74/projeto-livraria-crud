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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      return toast.error("Preencha todos os campos");
    }

    try {
      const { data } = await API.post("/auth/signup", {
        email,
        password,
        username,
      });

      if (!data.success) {
        return toast.error(data.message);
      }

      // guarda email para verificação
      localStorage.setItem("pendingEmail", JSON.stringify(email));

      toast.success("Conta criada! Verifique seu e-mail");
      navigate("/verify-email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro no servidor");
    }
  };

  useEffect(() => {
    document.body.className = "signup-page";
    return () => (document.body.className = "");
  }, []);

  return (
    <div className="container_auth">
      <div className="form_container">
        <h2>Criar conta</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleOnChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleOnChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={handleOnChange}
          />

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
