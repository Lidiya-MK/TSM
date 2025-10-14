const Mentor = require("../Models/Mentor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerMentor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Mentor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Mentor already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const mentor = await Mentor.create({
name,
      email,
      password: hashed,
      profilePicture: req.file?.path || null,
    });

    res.status(201).json({ message: "Mentor registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginMentor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const mentor = await Mentor.findOne({ email });
    if (!mentor) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, mentor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: mentor._id, role: "mentor" }, process.env.JWT_SECRET, { expiresIn: "1d" }
    );

    res.json({ token, role: "mentor" });
  } catch (err) { res.status(500).json({ error: err.message });}
};

exports.getMentorById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await Mentor.findById(id).select("-password"); 
    if (!mentor) return res.status(404).json({ message: "Uh Oh! Mentor not found" });

    res.status(200).json(mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
