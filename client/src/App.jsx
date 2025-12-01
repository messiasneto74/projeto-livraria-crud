import {BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ShowBookList from "./components/ShowBookList";
import CreateBook from "./components/CreateBook";
import ShowBookDetails from "./components/ShowBookDetails";
import UpdateBookInfo from "./components/UpdateBookInfo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  // Função simples para verificar login
  const isAuthenticated = () => {
    const user = localStorage.getItem("user");
    return !!user;
  };

  return (
    <Router>
      <Routes>
        {/* PAGINAS PÚBLICAS */}
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/signup"
          element={isAuthenticated() ? <Navigate to="/" /> : <Signup />}
        />

        {/* ROTAS PROTEGIDAS QUE USAM O LAYOUT */}
        <Route
          path="/"
          element={isAuthenticated() ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
          <Route path="show-book" element={<ShowBookList />} />
          <Route path="create-book" element={<CreateBook />} />
          <Route path="edit-book/:id" element={<UpdateBookInfo />} />
          <Route path="show-book/:id" element={<ShowBookDetails />} />
        </Route>

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
