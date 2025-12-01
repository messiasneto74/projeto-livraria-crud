import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // nossa URL base da API
});

console.log(`API URL: ${import.meta.env.VITE_API_URL}`);

// Solicita interceptador para adicionar o token portador
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Supondo que você armazene o token em Cookies
    console.log(`Token: ${token}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`Config: ${config.headers}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
