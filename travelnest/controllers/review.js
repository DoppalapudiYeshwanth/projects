const Review = require("../models/review");
const Listing = require("../models/listing");

const createRoute = async(req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();
    req.flash("addReview","Review Added Successfully");
    res.redirect(`/listings/${id}`);
};

const deleteRoute = async(req,res)=>{
    let { id , reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);

    await Listing.findByIdAndUpdate(id,{$pull :{reviews : reviewId}});
    req.flash("deleteReview","Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
};

module.exports = {createRoute, deleteRoute};