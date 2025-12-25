const Listing = require("../models/listing");
const {listingSchema} = require("../schema");
const ExpressError = require("../utils/ExpressError");

const showRoute = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("Listings/show.ejs",{allListings});
};

const newRoute = (req,res)=>{
    res.render("Listings/new.ejs");
};

const editRoute = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("noList","List doesn't exist");
        res.redirect("/listings");
    }
    res.render("Listings/edit.ejs",{listing});
};

const updateRoute = async (req, res) => {
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
};

const deleteRoute = async (req,res)=>{
    let {id} = req.params;
    await Listing.findOneAndDelete({ _id: id });
    req.flash("deleteList","Listed Deleted Successfully");
    res.redirect("/listings");
};

const detailedRoute = async (req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id).populate({path : "reviews", populate :{ path : "author"},}).populate("owner");
    if(!list){
        req.flash("noList","List doesn't exist");
        res.redirect("/listings");
    }
    res.render("Listings/detail.ejs",{list});
};

const createRoute =async (req, res) => {
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
    owner : req.user._id,
  });
  
  await listing.save();
  req.flash("addList","Listed Created Successfully");
  res.redirect("/listings");
};

module.exports = {showRoute , newRoute ,editRoute, updateRoute, deleteRoute, detailedRoute , createRoute};