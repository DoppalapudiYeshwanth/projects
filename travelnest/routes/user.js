const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const User = require("../models/user");

router.get("/signup",(req,res)=>{
    res.render("users/signup");
});
router.post("/signup",async(req,res)=>{
    let {username , email,password} = req.body;
    let newUser = new User({username ,email});
    let regUser = await User.register(newUser,password);
    console.log(regUser);
    req.flash("addUser","Welcome to TravelNest");
    res.redirect("/listings");
});

module.exports = router;
