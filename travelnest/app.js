if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const method_override = require("method-override");
const ejs_mate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listingsRoute = require("./routes/listing");
const reviewRoute = require("./routes/review");
const userRoute = require("./routes/user");
const express_session = require("express-session");
const MongoStore = require("connect-mongo").default;
const connect_flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const dbUrl = process.env.ATLAS_URL;

const app = express();
const port = 8080;

async function main(){
    await mongoose.connect(dbUrl);
}

main().then(() => {
  console.log("MongoDB Atlas Connected Successfully");
})
.catch((err) => {
  console.log("Connection Error:", err);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(method_override("_method")); 
app.engine('ejs',ejs_mate);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port,()=>{
    console.log("Listening on port 8080 actively");
});

//connect-monogo cloud version of express-session production level
const store = MongoStore.create({ 
    mongoUrl: dbUrl,
    crypto : {
      secret : process.env.SESSION_SECRET
    },
    touchAfter : 24 * 3600,
});

store.on("error",()=>{
  console.log("Error in Mongo session store");
});

const expressOptions = {
    store,
    secret : process.env.SESSION_SECRET,
    saveUninitialized :true,
    resave:false,
    cookie :{
      expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge : 7 * 24 * 60 * 60 * 1000,
      httpOnly : true,
    },
};


//express session
app.use(express_session(expressOptions));
app.use(connect_flash());

//passport authentication part
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "Invalid username" });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return done(null, false, { message: "Invalid password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//flash middleware
app.use((req,res,next)=>{
  res.locals.addList = req.flash("addList");
  res.locals.deleteList = req.flash("deleteList");
  res.locals.updateList = req.flash("updateList");
  res.locals.addReview = req.flash("addReview");
  res.locals.deleteReview = req.flash("deleteReview");
  res.locals.noList= req.flash("noList");
  res.locals.addUser= req.flash("addUser");
  res.locals.success= req.flash("success");
  res.locals.error= req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

//Calling Express routes
app.use("/listings",listingsRoute);
app.use("/listings/:id/reviews",reviewRoute);
app.use("/users", userRoute);



app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

//middle ware to handle errors
app.use((err,req,res,next)=>{
    let{status=500,message="Something went wrong"}=err;
    res.status(status).render("error.ejs",{message});
});

