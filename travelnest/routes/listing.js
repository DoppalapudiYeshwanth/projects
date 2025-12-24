const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const ExpressError = require("../utils/ExpressError");
const {listingSchema} = require("../schema");
const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleware");

//functions 
const validateListing = (req,res,next)=>{
    let { error }= listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//show route
router.get("/", WrapAsync (async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("Listings/show.ejs",{allListings});
}));

//new route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("Listings/new.ejs");
});

//edit route
router.get("/:id/edit", isLoggedIn,WrapAsync (async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("noList","List doesn't exist");
        res.redirect("/listings");
    }
    res.render("Listings/edit.ejs",{listing});
}));

//update route
router.put("/:id", isLoggedIn,WrapAsync(async (req, res) => {
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
    req.flash("updateList","Listed Updated Successfully");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id/delete",isLoggedIn,WrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findOneAndDelete({ _id: id });
    req.flash("deleteList","Listed Deleted Successfully");
    res.redirect("/listings");
}));

//detailed route
router.get("/:id",WrapAsync(async (req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id).populate("reviews");
    if(!list){
        req.flash("noList","List doesn't exist");
        res.redirect("/listings");
    }
    res.render("Listings/detail.ejs",{list});
}));

//create route
router.post("/",validateListing, WrapAsync(async (req, res) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }

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
  req.flash("addList","Listed Created Successfully");
  res.redirect("/listings");
}));

module.exports = router;