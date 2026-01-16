import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pagestyles.css";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleError = (msg) => toast.error(msg, { position: "bottom-left" });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      handleError("Preencha email e senha.");
      return;
    }

    try {
      const { data } = await API.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("RESPOSTA LOGIN ===>", data);

      if (!data?.success) {
        handleError(data?.message || "Erro no login");
        return;
      }

      if (!data?.user) {
        handleError("Erro interno: usuário não retornado.");
        return;
      }

      // ✅ 1. SALVA USUÁRIO
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ 2. ATUALIZA ESTADO GLOBAL (ANTES DO NAVIGATE)
      setIsAuth(true);

      handleSuccess("Login realizado com sucesso!");

      // ✅ 3. REDIRECIONA
      navigate("/", { replace: true });
    } catch (error) {
  console.error("LOGIN ERROR:", error);
  console.error("RESPONSE:", error.response);
  console.error("MESSAGE:", error.message);

  toast.error(
    error.response?.data?.message ||
    error.message ||
    "Erro ao conectar com o servidor"
  );
}


  // Estilo da página de login
  useEffect(() => {
    document.body.className = "login-page";
    return () => {
      document.body.className = "";
    };
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
