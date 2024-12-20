import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here (e.g., API call)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div className=" col-4 m-5 border border-3 border-secondary rounded-5 shadow-lg p-5">
          <form onSubmit={handleSubmit} className="">
            <h2 className="text-center text-secondary">Login</h2>
            <div className="form-group p-3">
              <label htmlFor="exampleInputEmail1" className="mb-1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group p-3">
              <label htmlFor="exampleInputPassword1" className="mb-1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
