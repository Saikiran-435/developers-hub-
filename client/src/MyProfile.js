import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3500/myprofile", {
        headers: { "x-token": token },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [token, navigate]);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="fw-bold">{user.fullname}</h3>
        <p>{user.skill}</p>
        <p>{user.email}</p>
        <p>{user.mobile}</p>
      </div>
    </div>
  );
};

export default MyProfile;
