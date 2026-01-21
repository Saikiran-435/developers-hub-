const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    taskprovider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "devuser", 
      required: true,
    },
    taskworker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "devuser", 
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);

