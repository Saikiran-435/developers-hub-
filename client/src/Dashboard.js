import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3500/allprofiles", {
        headers: { "x-token": token },
      })
      .then((res) => setProfiles(res.data))
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">Developers Hub</span>
        <div>
        <Link to="/myprofile" className="btn btn-outline-light me-3">
  My Profile
</Link>


          <button onClick={logoutHandler} className="btn btn-danger">
            Logout
          </button>
        </div>
      </nav>

    
      <div className="container mt-4">
        <div className="row">
          {profiles.length > 0 ? (
            profiles.map((user) => (
              <div className="col-md-4 mb-4" key={user._id}>
                <div
                  className="card shadow-lg text-center p-4"
                  style={{ borderRadius: "20px", minHeight: "350px" }}
                >
                  {/* Avatar Placeholder */}
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      backgroundColor: "#e9ecef",
                      fontSize: "40px",
                      fontWeight: "bold",
                      color: "#6c757d",
                    }}
                  >
                    {user.fullname?.charAt(0).toUpperCase()}
                  </div>

                  <h4 className="fw-bold">{user.fullname}</h4>
                  <p className="text-muted mb-1">{user.skill}</p>
                  <p className="text-muted">{user.email}</p>

                  <Link
                    to={`/profile/${user._id}`}
                    className="btn btn-primary mt-3"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No profiles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

