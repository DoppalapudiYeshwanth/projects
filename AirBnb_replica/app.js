const express = require("express");
const mongoose = require("mongoose");
const Listing = require("../AirBnb_replica/models/listing")
const path = require("path");
const method_override = require("method-override");
const ejs_mate = require("ejs-mate");
const WrapAsync = require("./utils/WrapAsync");
const ExpressError = require("./utils/ExpressError");
const {listingSchema} = require("../AirBnb_replica/schema")

const app = express();
const port = 8080;

async function main(){
    mongoose.connect("mongodb+srv://yeshwanthd2006_db_user:yeshwanth2006D@airbnbproject.bcjspuj.mongodb.net/?appName=AirBnbProject")
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
// app.get("/home",(req,res)=>{
//     console.log("Server working");
// }); 
// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title : "Villa",
//         description : "Have a happy stay",
//         image : "",
//         price : 12389,
//         location : "Hyd",
//         country : "India",
//     });
//     await sampleListing.save();
//     console.log("Listing Done");
// });

//show route
app.get("/listings", WrapAsync (async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("Listings/show.ejs",{allListings});
}));
//new route
app.get("/listings/new",(req,res)=>{
    res.render("Listings/new.ejs");
});
//edit route
app.get("/listings/:id/edit", WrapAsync (async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("Listings/edit.ejs",{listing});
}));
//update route
app.put("/listings/:id", WrapAsync(async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        price,
        location,
        country,
        image
    } = req.body.Listing;
    const listing = await Listing.findById(id);

    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.location = location;
    listing.country = country;

    if (image && image.trim() !== "") {
        listing.image = {
            filename: "listingimage",
            url: image
        };
    }
    await listing.save();
    res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id/delete",WrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));
//detailed route
app.get("/listings/:id",WrapAsync(async (req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id);
    res.render("Listings/detail.ejs",{list});
}));
//create route
app.post("/listings", WrapAsync(async (req, res) => {
    listingSchema.validate(req.body);
    const listing = new Listing({
    title: req.body.Listing.title,
    description: req.body.Listing.description,
    image: {
      filename: "listingimage",
      url: req.body.Listing.image,
    },
    price: req.body.Listing.price,
    location: req.body.Listing.location,
    country: req.body.Listing.country,
  });
  await listing.save();
  res.redirect("/listings");
}));
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});
//middle ware to handle errors
app.use((err,req,res,next)=>{
    let{status,message}=err;
    res.status(status).render("error.ejs",{message});
});

