import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState("No ratings yet");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // 🔹 Fetch Profile
    axios
      .get(`http://localhost:3500/profile/${id}`, {
        headers: { "x-token": token },
      })
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null));

    // 🔹 Fetch Reviews
    axios
      .get(`http://localhost:3500/reviews/${id}`, {
        headers: { "x-token": token },
      })
      .then((res) => {
        setReviews(res.data.reviews);
        setAvgRating(
          res.data.totalReviews === 0
            ? "No ratings yet"
            : res.data.avgRating
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, token]);

  const submitRating = () => {
    if (rating === 0) return alert("Select rating");

    axios
      .post(
        "http://localhost:3500/addreview",
        {
          taskprovider: id,
          rating,
        },
        {
          headers: { "x-token": token },
        }
      )
      .then(() => {
        alert("Rating submitted");
        window.location.reload();
      })
      .catch((err) => alert(err.response.data.msg));
  };

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;
  if (!profile) return <h3 className="text-center">Profile not found</h3>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">

        <h3 className="fw-bold">{profile.fullname}</h3>
        <p>{profile.skill}</p>
        <p>{profile.email}</p>
        <p>{profile.mobile}</p>

        <hr />

        <h5>⭐ Average Rating: {avgRating}</h5>

        <hr />

        <h5>Rate this Developer</h5>
        <select
          className="form-select w-25"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="0">Select Rating</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>

        <button className="btn btn-primary mt-3" onClick={submitRating}>
          Submit Rating
        </button>

        <hr />

        <h5>Reviews</h5>
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((r) => (
            <p key={r._id}>
              ⭐ {r.rating} — {r.taskworker.fullname}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
