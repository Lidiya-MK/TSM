const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const {
  createSession,
  getAllSessions,
  updateSession,
  deleteSession,
  getSessionById,
} = require("../controllers/sessionController");

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

// these ones are for mentors only
router.post("/", protect(), upload.single("coverImage"), createSession);
router.put("/:id", protect(), upload.single("coverImage"), updateSession);
router.delete("/:id", protect(), deleteSession);
router.get("/:id", protect(), getSessionById);

// this one is for both mentors and trainees
router.get("/", protect(), getAllSessions);


module.exports = router;
