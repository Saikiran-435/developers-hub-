import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3500/login",
        data
      );

      
      localStorage.setItem("token", res.data.token);

      
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={data.email}
              onChange={changeHandler}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={data.password}
              onChange={changeHandler}
              required
            />
          </div>

          <button className="btn btn-dark w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Back to <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
