import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Navbar({ username }) {
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid container d-flex align-items-center">
        <Link to="/" className="text-decoration-none">
          <p className="nav-brand fw-bold fs-3 text-white">ComicShelf</p>
        </Link>
        <div className="d-flex align-items-center">
          <Link
            to="/"
            className="text-decoration-none text-white fw-bold btn fs-5 mb-0 me-3"
          >
            Home
          </Link>
          <Link to="/new-book">
            <button type="button" className="btn btn-primary fs-5">
              Add a New Book
            </button>
          </Link>
          <Link to="/logout" style={{ textDecoration: "none" }}>
            <span className="text-info ms-5 fs-5 fw-normal text-capitalize">
              {username}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
