import "./App.css";
import BookDetail from "./Pages/BookDetail";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import NewBook from "./Pages/NewBook";
import UpdateBook from "./Pages/UpdateBook";
import DeleteBook from "./Pages/DeleteBook";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/new-book" element={<NewBook />} />
        <Route path="/book-detail/:isbn" element={<BookDetail />} />
        <Route path="/update-book/:isbn" element={<UpdateBook />} />
        <Route path="/delete-book/:isbn" element={<DeleteBook />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
