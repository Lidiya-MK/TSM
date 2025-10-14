const Trainee = require("../Models/Trainee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerTrainee = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Trainee.findOne({ email });
    if (existing) return res.status(400).json({ message: "Trainee already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const trainee = await Trainee.create({
      name,
      email,
      password: hashed,
      profilePicture: req.file?.path || null,
    });

    res.status(201).json({ message: "Trainee registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginTrainee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const trainee = await Trainee.findOne({ email });
    if (!trainee) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, trainee.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: trainee._id, role: "trainee" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: "trainee" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTraineeById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainee = await Trainee.findById(id).select("-password"); 
    if (!trainee) return res.status(404).json({ message: "Oops! Trainee not found" });

    res.status(200).json(trainee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
