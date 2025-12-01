import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import API from "../API"; // vamos ligar depois
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

  // gera um "nome" a partir do email (até conectar com o backend real)
  const getNameFromEmail = (email) => {
    if (!email) return "Usuário";
    return email.split("@")[0]; // ex: messiasneto74@... -> "messiasneto74"
  };

  // POR ENQUANTO: salva nome+email no localStorage e vai pro dashboard
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      handleError("Preencha email e senha");
      return;
    }

    const fakeUser = {
      name: getNameFromEmail(email),
      email,
    };

    // salva o usuário no localStorage
    localStorage.setItem("user", JSON.stringify(fakeUser));

    handleSuccess("Login realizado com sucesso!");

    // redireciona pro dashboard (Layout + livros)
    setTimeout(() => navigate("/"), 500);
  };

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
