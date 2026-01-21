import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
        
          <Link className="navbar-brand fw-bold" to="/">
            <i className="fas fa-code"></i> Developers Hub
          </Link>

        
          <div className="ms-auto">
            <Link to="/register" className="btn btn-outline-light me-2">
              Register
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </nav>

      
      <section className="hero text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Developers Hub</h1>

          <p className="lead mt-3">
            Create a developer profile, share posts and get help from other developers
          </p>

          
          <div className="mt-4">
            <Link to="/register" className="btn btn-primary btn-lg me-3">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">
              Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;


