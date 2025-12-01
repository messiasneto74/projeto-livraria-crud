import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ShowBookList from "./components/ShowBookList";
import CreateBook from "./components/CreateBook";
import ShowBookDetails from "./components/ShowBookDetails";
import UpdateBookInfo from "./components/UpdateBookInfo";
import Login from "./pages/Login.jsx";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Tela de login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard (sidebar + área dos livros) */}
        <Route element={<Layout />}>
          <Route path="/" element={<ShowBookList />} />
          <Route path="/show-book" element={<ShowBookList />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
          <Route path="/show-book/:id" element={<ShowBookDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
