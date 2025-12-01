import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/login", { ...inputValue });

      const { success, message } = data;
      if (success) {
        handleSuccess(message || "Login realizado com sucesso!");
        setTimeout(() => navigate("/"), 800);
      } else {
        handleError(message || "Usuário ou senha inválidos");
      }
    } catch (error) {
      console.error(error);
      handleError("Erro ao fazer login");
    }

    setInputValue({ email: "", password: "" });
  };

  return (
    <div className="container_auth">
      <div className="form_container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Digite seu email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Digite sua senha"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
