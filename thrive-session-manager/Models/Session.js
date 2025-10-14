const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coverImage: { type: String },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  instructorName: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
});

module.exports = mongoose.model("Session", sessionSchema);
