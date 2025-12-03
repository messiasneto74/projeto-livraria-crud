import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { ProSidebarProvider } from "react-pro-sidebar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </React.StrictMode>
);
      console.error("Erro ao conectar com o servidor. Tente novamente mais tarde.");