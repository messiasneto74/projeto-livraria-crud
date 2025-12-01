import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pagestyles.css";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
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

    if (!email || !password) {
      return handleError("Preencha email e senha.");
    }

    try {
      const { data } = await API.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("RESPOSTA LOGIN ===> ", data);

      if (!data.success) {
        return handleError(data.message || "Erro no login");
      }

      if (!data.user) {
        return handleError("Erro interno: usuário não retornado.");
      }

      // SALVA USUÁRIO NO LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(data.user));

      handleSuccess("Login realizado com sucesso!");

      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      console.error("ERRO LOGIN ===> ", error);
      handleError("Erro ao conectar com o servidor.");
    }
  };

  // Aplica estilo adequado
  useEffect(() => {
    document.body.className = "login-page";
    return () => (document.body.className = "");
  }, []);

  return (
    <div className="container_auth">
      <div className="form_container">
        <h2>Login Account</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label>Password</label>
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
            Don’t have an account? <Link to="/signup">Signup</Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
