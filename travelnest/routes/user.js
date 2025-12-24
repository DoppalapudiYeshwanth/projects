const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");
const {saveRedirectUrl } = require("../middleware");

router.get("/signup",(req,res)=>{
    res.render("users/signup");
});

router.post("/signup", WrapAsync(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash("error", "User already exists");
      return res.redirect("/users/login");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // auto login after signup
    req.login(newUser, (err) => {
      if (err) {
        req.flash("error", "Login failed");
        return res.redirect("/users/login");
      }
      req.flash("success", "Welcome to TravelNest");
      res.redirect("/listings");
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Signup failed");
    res.redirect("/users/signup");
  }
}));

router.get("/login",(req,res)=>{
    res.render("users/login");
});

router.post(
  "/login",saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  (req, res) => {  
    req.flash("success", "Welcome back to TravelNest");
    if(!res.locals.redirectUrl){
      return res.redirect("/listings");
    }else{
     return res.redirect(res.locals.redirectUrl);
    }
    
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully");
    res.redirect("/listings");
  });
});


module.exports = router;
