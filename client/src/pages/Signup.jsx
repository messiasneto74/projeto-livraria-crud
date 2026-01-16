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

  const handleError = (msg) => toast.error(msg, { position: "bottom-left" });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      handleError("Preencha todos os campos.");
      return;
    }

    try {
      const { data } = await API.post(
        "/auth/signup",
        { email, password, username },
        { withCredentials: true }
      );

      if (!data?.success) {
        handleError(data?.message || "Erro ao criar conta.");
        return;
      }

      handleSuccess("Conta criada! Verifique seu e-mail.");

      // 🔐 salva email para a verificação
      localStorage.setItem("pendingEmail", email);

      setTimeout(() => {
        navigate("/verify-email");
      }, 800);
    } catch (error) {
      console.error("ERRO /signup ===>", error);
      handleError("Erro ao conectar com o servidor.");
    }

    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  useEffect(() => {
    document.body.className = "signup-page";
    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <div className="container_auth">
      <div className="form_container">
        <h2>Signup Account</h2>

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
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
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
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
