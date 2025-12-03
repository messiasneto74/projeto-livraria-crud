import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL base da API (ex: http://localhost:8082)
});

console.log("API URL =>", import.meta.env.VITE_API_URL);

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // token vem do cookie "token"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`Config: ${config.header}`);
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
