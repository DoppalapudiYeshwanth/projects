const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const User = require("../models/user");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup");
});
router.post("/signup",async(req,res)=>{
    console.log("Post working");
    console.log(req.body);
    let {username, email,password} = req.body;
    let newUser = new User({username ,email});
    console.log(newUser);
    let regUser = User.register(newUser,password);
    console.log(regUser);
    req.flash("addUser","Welcome to TravelNest");
    res.redirect("/listings");
});
router.get("/login",(req,res)=>{
    res.render("users/login");
});
router.post("/login",passport.authenticate("local",{failureRedirect : "/login",failureFlash :true,}),async(req,res)=>{
    req.flash("create",("Welcome to TravelNest you are logged in."));
    res.redirect("/listings");
});

module.exports = router;
