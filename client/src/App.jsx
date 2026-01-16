import {BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import ShowBookList from "./components/ShowBookList";
import CreateBook from "./components/CreateBook";
import ShowBookDetails from "./components/ShowBookDetails";
import UpdateBookInfo from "./components/UpdateBookInfo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";


function App() {
  const [isAuth, setIsAuth] = useState(false);

  // ✅ sincroniza auth APENAS ao carregar o app
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setIsAuth(!!user);
    } catch {
      setIsAuth(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to="/" replace />
            ) : (
              <Login setIsAuth={setIsAuth} />
            )
          }
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            isAuth ? (
              <Navigate to="/" replace />
            ) : (
              <Signup setIsAuth={setIsAuth} />
            )
          }
        />
        {/* 🔐 VERIFY EMAIL */}
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* ROTAS PROTEGIDAS */}
        <Route
          path="/"
          element={
            isAuth ? (
              <Layout setIsAuth={setIsAuth} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Home />} />
          <Route path="show-book" element={<ShowBookList />} />
          <Route path="create-book" element={<CreateBook />} />
          <Route path="edit-book/:id" element={<UpdateBookInfo />} />
          <Route path="show-book/:id" element={<ShowBookDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
