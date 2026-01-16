import { useState, useEffect } from "react";
import API from "../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./pagestyles.css";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  // ⚠️ email é STRING, não JSON
  const email = localStorage.getItem("pendingEmail");

  // 🔒 protege acesso direto à rota
  useEffect(() => {
    if (!email) {
      toast.error("Nenhum e-mail para verificação.");
      navigate("/signup", { replace: true });
    }
  }, [email, navigate]);

  // ==========================
  // SUBMIT VERIFICATION
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || code.length !== 6) {
      toast.error("Informe o código de 6 dígitos.");
      return;
    }

    try {
      const { data } = await API.post(
        "/auth/verify-email",
        { email, code },
        { withCredentials: true }
      );

      if (!data?.success) {
        toast.error(data?.message || "Código inválido.");
        return;
      }

      toast.success("E-mail verificado com sucesso!");

      // 🧹 limpa email temporário
      localStorage.removeItem("pendingEmail");

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("VERIFY EMAIL ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Erro ao verificar código"
      );
    }
  };

  return (
    <div className="container_auth">
      <div className="form_container">
        <h2>Verifique seu e-mail</h2>

        <p>
          Enviamos um código para:
          <br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código de 6 dígitos"
            value={code}
            maxLength={6}
            onChange={(e) => setCode(e.target.value)}
          />

          <button type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
