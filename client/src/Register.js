import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    skill: "",
    password: "",
    conformpassword: ""
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.conformpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:3500/register", data);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "420px" }}>
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              className="form-control"
              name="fullname"
              value={data.fullname}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={data.email}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="mb-3">
            <label>Mobile</label>
            <input
              className="form-control"
              name="mobile"
              value={data.mobile}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="mb-3">
            <label>Skill</label>
            <input
              className="form-control"
              name="skill"
              value={data.skill}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={data.password}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              className="form-control"
              type="password"
              name="conformpassword"
              value={data.conformpassword}
              onChange={changeHandler}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Create Account</button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
