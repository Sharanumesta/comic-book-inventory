import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}/${
    import.meta.env.VITE_AUTH_ROUTE
  }`;

  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      // navigate("/login");
      navigate("/");
    }else{
    }
  }, [navigate]);

  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/register`, admin);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className=" col-4 m-5 border border-3 border-secondary rounded-5 shadow-lg p-5">
          {error && (
            <div className="alert alert-danger fw-semibold text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="">
            <h2 className="text-center text-secondary">Register</h2>
            <div className="form-group p-3">
              <label
                htmlFor="username"
                className="mb-1 fw-semibold text-secondary"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                name="username"
                value={admin.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group p-3">
              <label
                htmlFor="email"
                className="mb-1 fw-semibold text-secondary"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group p-3">
              <label
                htmlFor="password"
                className="mb-1 fw-semibold text-secondary"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className=" d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-secondary fw-bold mt-3"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;
