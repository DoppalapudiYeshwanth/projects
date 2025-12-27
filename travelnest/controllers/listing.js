const Listing = require("../models/listing");
const {listingSchema} = require("../schema");
const ExpressError = require("../utils/ExpressError");


const showRoute = async (req,res)=>{
    // const allListings = await Listing.find({});
    const { category } = req.query;

    let listings;
    if (category) {
        listings = await Listing.find({ category });
    } else {
        listings = await Listing.find({});
    }
    res.render("Listings/show.ejs",{allListings : listings, category});
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
    // let originalImageUrl = listing.image.url;
    // originalImageUrl.replace("/upload","/upload/h_30,w_25");

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
        category,
    } = req.body.Listing;
    
    const listing = await Listing.findById(id);

    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.location = location;
    listing.country = country;
    listing.category = category;
    
    if (req.files && req.files.length > 0) {
        for (let file of req.files) {
            listing.images.push({
                filename: file.filename,
                url: file.path,
            });
        }
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
    const images = req.files.map(file => ({
    filename: file.filename,
    url: file.path,
    }));

    const listing = new Listing({
    title: req.body.Listing.title,
    description: req.body.Listing.description,
    images,
    price: req.body.Listing.price,
    location: req.body.Listing.location,
    country: req.body.Listing.country,
    owner : req.user._id,
    category: req.body.Listing.category,
  });
  
  await listing.save();
  req.flash("addList","Listed Created Successfully");
  res.redirect("/listings");
};

const deleteImage = async (req, res) => {
    const { id, imageId } = req.params;
    await Listing.findByIdAndUpdate(id, {
      $pull: { images: { _id: imageId } }
    });

    req.flash("updateList", "Image deleted successfully");
    res.redirect(`/listings/${id}/edit`);
};

module.exports = {showRoute , newRoute ,editRoute, updateRoute, deleteRoute, detailedRoute , createRoute, deleteImage};