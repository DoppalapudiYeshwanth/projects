const User = require("../models/user");
const bcrypt = require("bcrypt");


const signupGetRoute = (req,res)=>{
    res.render("users/signup");
};

const signupPostRoute = async (req, res) => {
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
};

const loginGetRoute = (req,res)=>{
    res.render("users/login");
};

const loginPostRoute = (req, res) => {  
    req.flash("success", "Welcome back to TravelNest");
    if(!res.locals.redirectUrl){
      return res.redirect("/listings");
    }else{
     return res.redirect(res.locals.redirectUrl);
    }
};

const logoutRoute = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully");
    res.redirect("/listings");
  });
};

module.exports = {signupGetRoute, signupPostRoute, loginGetRoute, loginPostRoute, logoutRoute};