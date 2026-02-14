const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/authController");


router.get("/register/candidate", (req, res) => {
  res.render("authViews/candidateRegister.ejs");
});

router.get("/register/hr", (req, res) => {
  res.render("authViews/HrRegister.ejs");
});


router.get("/login", (req, res) => {
  res.render("authViews/login.ejs");
});


router.post(
  "/register/candidate",
  upload.single("resume"),
  authController.registerCandidate
);


router.post("/register/hr", authController.registerHR);

router.post("/login", authController.loginUser);

module.exports = router;
