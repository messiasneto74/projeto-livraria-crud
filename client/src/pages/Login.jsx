import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Se ainda não for usar a API real, pode comentar a linha abaixo
// import API from "../API";
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

  // POR ENQUANTO: só navega pro dashboard
  const handleSubmit = (e) => {
    e.preventDefault();
    // teste: ir direto para a home (layout + livros)
    navigate("/");
  };

  /*  👉 DEPOIS, quando quiser usar a API real, troca o handleSubmit por este:

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/login",
        { ...inputValue },
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message || "Login realizado com sucesso!");
        setTimeout(() => navigate("/"), 800);
      } else {
        handleError(message || "Usuário ou senha inválidos");
      }
    } catch (error) {
      console.error("ERRO NA REQUISIÇÃO /login ===>", error);
      handleError("Erro ao fazer login");
    }

    setInputValue({ email: "", password: "" });
  };
  */

  return (
    <div className="container_auth">
      <div className="form_container">
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
