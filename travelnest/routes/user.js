const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const {saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");

router.get("/logout", userController.logoutRoute);


router.route("/signup")
    .get(userController.signupGetRoute)
    .post(WrapAsync(userController.signupPostRoute));

router.route("/login")
    .get(userController.loginGetRoute)
    .post(saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  userController.loginPostRoute
);

module.exports = router;
