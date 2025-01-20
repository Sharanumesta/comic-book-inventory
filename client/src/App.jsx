import React, { useState, useEffect } from "react";
import "./App.css";
import BookDetail from "./Pages/BookDetail";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import NewBook from "./Pages/NewBook";
import UpdateBook from "./Pages/UpdateBook";
import DeleteBook from "./Pages/DeleteBook";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Register from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./Pages/NotFound";

function App() {

  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/new-book" element={<NewBook />} />
        <Route path="/book-detail/:isbn" element={<BookDetail />} />
        <Route path="/update-book/:isbn" element={<UpdateBook />} />
        <Route path="/delete-book/:isbn" element={<DeleteBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Conditionally render Navbar based on the current route
function ConditionalNavbar({ username }) {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"]; 

  return !hideNavbarPaths.includes(location.pathname) ? <Navbar username={username} /> : null;
}

export default App;
