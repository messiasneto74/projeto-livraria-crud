import axios from "axios";
import Cookies from "js-cookie";

// Pega o valor da env uma vez
const baseURL = import.meta.env.VITE_API_URL;

console.log("API URL =>", baseURL);

const api = axios.create({
  // Se tiver VITE_API_URL, usa ela; senão, usa localhost
  baseURL: baseURL || "http://localhost:8082",
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // token vem do cookie "token"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Config headers =>", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
