const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

/* Pages */
router.get("/register", (req, res) => {
  res.render("authViews/register.ejs");
});

router.get("/login", (req, res) => {
  res.render("authViews/login.ejs");
});

/* Actions */
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;
