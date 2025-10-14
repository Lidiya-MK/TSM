const express = require("express");
const router = express.Router();


router.get("/landing", (req, res) => {
  res.render("landing-page"); 
});


router.get("/trainee-signup", (req, res) => {
  res.render("trainee-signup");
});


router.get("/mentor-signup", (req, res) => {
  res.render("mentor-signup");
});


router.get("/trainee-login", (req, res) => {
  res.render("trainee-login");
});


router.get("/mentor-login", (req, res) => {
  res.render("mentor-login");
});




router.get("/trainee/:id/home", (req, res) => {
  const traineeId = req.params.id; 
  res.render("trainee-home", { traineeId }); 
});


router.get("/mentor/:id/dashboard", (req, res) => {
  const mentorId = req.params.id;
  res.render("mentor-dashboard", { mentorId });
});

module.exports = router;
