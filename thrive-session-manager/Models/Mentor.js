const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  profilePicture: { type: String },
});

module.exports = mongoose.model("Mentor", mentorSchema);
