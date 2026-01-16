import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8082";

console.log("API URL =>", baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true, // 🔥 O MAIS IMPORTANTE
});

export default api;
