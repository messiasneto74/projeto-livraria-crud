import { useState } from "react";
import API from "../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const email = JSON.parse(localStorage.getItem("pendingEmail"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/verify-email", { email, code });
      toast.success("E-mail verificado com sucesso!");
      localStorage.removeItem("pendingEmail");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Código inválido");
    }
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
