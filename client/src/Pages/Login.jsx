import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}/${
    import.meta.env.VITE_AUTH_ROUTE
  }`;

  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchAdmin = async () => {
        try {
          const res = await axios.post(
            `${baseUrl}/login`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.data.username) {
            localStorage.setItem("username", res.data.username);
            navigate("/");
          }
        } catch (error) {
          localStorage.removeItem("token");
        }
      };

      fetchAdmin();
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/login`, admin);
      const token = res.data.token;
      const username = res.data.username;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      navigate("/");
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
          <form onSubmit={handleSubmit}>
            <h2 className="text-center" style={{ color: "#4C585B" }}>
              Login
            </h2>
            <div className="form-group p-3">
              <label
                htmlFor="email1"
                className="mb-1 fw-semibold"
                style={{ color: "#4C585B" }}
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email1"
                placeholder="Enter email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                required
                style={{ color: "#4C585B" }}
              />
            </div>
            <div className="form-group p-3">
              <label
                htmlFor="password"
                className="mb-1 fw-semibold"
                style={{ color: "#4C585B" }}
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
                style={{ color: "#4C585B" }}
              />
            </div>
            <div className=" d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-secondary fw-bold mt-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
