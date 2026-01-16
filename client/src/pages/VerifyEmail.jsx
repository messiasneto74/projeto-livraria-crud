import { useState } from "react";
import API from "../API";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const email = JSON.parse(localStorage.getItem("pendingEmail"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/auth/verify-email", { email, code });

    alert("E-mail verificado com sucesso!");
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verifique seu e-mail</h2>
      <input
        placeholder="Código de 6 dígitos"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">Confirmar</button>
    </form>
  );
}
