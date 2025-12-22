const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const method_override = require("method-override");
const ejs_mate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listingsRoute = require("./routes/listing");
const reviewRoute = require("./routes/review");

const app = express();
const port = 8080;

async function main(){
    await mongoose.connect("mongodb+srv://yeshwanthd2006_db_user:yeshwanth2006D@airbnbproject.bcjspuj.mongodb.net/?appName=AirBnbProject")
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


//Calling Express routes
app.use("/listings",listingsRoute);
app.use("/listings/:id",reviewRoute);


app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

//middle ware to handle errors
app.use((err,req,res,next)=>{
    let{status=500,message="Something went wrong"}=err;
    res.status(status).render("error.ejs",{message});
});

