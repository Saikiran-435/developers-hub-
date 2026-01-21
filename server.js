const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const devuser = require("./devusermodel");
const Review = require("./review");
const middleware = require("./middleware");

const app = express();


mongoose
  .connect(
    "mongodb+srv://mern_user:backend123@cluster0.gt54d7r.mongodb.net/?appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));


app.use(express.json());
app.use(cors({ origin: "*" }));


app.get("/", (req, res) => {
  res.send("Server is running...");
});


app.post("/register", async (req, res) => {
  try {
    const { fullname, email, mobile, skill, password, conformpassword } =
      req.body;

    const exist = await devuser.findOne({ email });
    if (exist) return res.status(400).send("User already exists");

    if (password !== conformpassword)
      return res.status(400).send("Password mismatch");

    const user = new devuser({
      fullname,
      email,
      mobile,
      skill,
      password,
      conformpassword
    });

    await user.save();
    res.status(200).send("User registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await devuser.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    if (user.password !== password)
      return res.status(400).send("Invalid password");

    const payload = {
      user: { id: user._id },
    };

    jwt.sign(payload, "jwtPassword", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.get("/allprofiles", middleware, async (req, res) => {
  try {
    const profiles = await devuser.find().select("-password");
    res.json(profiles);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


app.get("/myprofile", middleware, async (req, res) => {
  try {
    const user = await devuser.findById(req.user.id).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


app.get("/profile/:id", middleware, async (req, res) => {
  try {
    const user = await devuser.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


app.post("/addreview", middleware, async (req, res) => {
  try {
    const { taskprovider, rating, comment } = req.body;

    if (!taskprovider || !rating)
      return res.status(400).json({ msg: "Rating required" });

    
    if (taskprovider === req.user.id)
      return res.status(400).json({ msg: "You cannot rate yourself" });

    
    const existing = await Review.findOne({
      taskprovider,
      taskworker: req.user.id,
    });

    if (existing)
      return res.status(400).json({ msg: "You already rated this user" });

    const review = new Review({
      taskprovider,           // 👤 Profile owner (being rated)
      taskworker: req.user.id, // 👤 Logged-in user (who rated)
      rating,
      comment,
    });

    await review.save();
    res.status(200).json({ msg: "Review added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.get("/reviews/:userId", middleware, async (req, res) => {
  try {
    const reviews = await Review.find({
      taskprovider: req.params.userId,
    }).populate("taskworker", "fullname");

    const totalReviews = reviews.length;
    const avgRating =
      totalReviews === 0
        ? 0
        : (
            reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
            totalReviews
          ).toFixed(1);

    res.json({
      reviews,
      totalReviews,
      avgRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.listen(3500, () => {
  console.log(" Server is running");
});
