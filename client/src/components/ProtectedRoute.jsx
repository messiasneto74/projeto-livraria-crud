import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import API from "../API";

const ProtectedRoute = ({ handleError, allowedRoles }) => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        console.log("No token found");
        navigate("/login");
        return;
      }

      try {
        const { data } = await API.post("/", {}, { withCredentials: true });
        setRole(data.role);
      } catch (error) {
        console.error("Erro ao verificar o cookie:", error);
        handleError("Erro de autenticação. Faça login novamente.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyCookie();
  }, [cookies, navigate]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!role || !allowedRoles.includes(role)) {
    handleError("Você não está autorizado a acessar esta página!");
    return <Navigate to="/show-book" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
