import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.post(`${baseUrl}/login`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.data.status === 200) navigate("/");
        } catch (error) {}
      }
    };
    fetchAdmin();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/login`, admin);
      const token = res.data.token;
      localStorage.setItem("token", token);
    } catch (error) {
      console.log("Error while Login...", error.message);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className=" col-4 m-5 border border-3 border-secondary rounded-5 shadow-lg p-5">
          <form onSubmit={handleSubmit} className="">
            <h2 className="text-center text-secondary">Login</h2>
            <div className="form-group p-3">
              <label
                htmlFor="exampleInputEmail1"
                className="mb-1 fw-semibold text-secondary"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group p-3">
              <label
                htmlFor="exampleInputPassword1"
                className="mb-1 fw-semibold text-secondary"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className=" d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
