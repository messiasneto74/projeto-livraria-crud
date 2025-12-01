import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* por enquanto, qualquer rota mostra o Login */}
        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
}
