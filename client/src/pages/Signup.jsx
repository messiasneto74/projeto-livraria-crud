import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pagestyles.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password } = form;

    if (!email || !username || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      const { data } = await API.post("/auth/signup", {
        email,
        username,
        password,
      });

      if (!data.success) {
        toast.error(data.message || "Erro no cadastro");
        return;
      }

      toast.success("Conta criada com sucesso!");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Erro ao conectar com o servidor"
      );
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
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Usuário"
            value={form.username}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
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
}
