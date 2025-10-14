const express = require("express");
const router = express.Router();
const multer = require("multer");
const { registerTrainee, loginTrainee,getTraineeById } = require("../controllers/traineeController");
const { protect } = require("../middleware/authMiddleware");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
router.post("/register", upload.single("profilePicture"), registerTrainee);
router.post("/login", loginTrainee);
router.get("/:id", protect(),getTraineeById);

module.exports = router;
