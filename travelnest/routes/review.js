const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync");
const ExpressError = require("../utils/ExpressError");
const {reviewSchema} = require("../schema");
const Review = require("../models/review");
const Listing = require("../models/listing");

//functions 
const validateReview = (req,res,next)=>{
    let { error }= reviewSchema.validate(req.body);
    if(error){
        let erMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//reviews route
router.post("/",validateReview,WrapAsync(async(req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();
    req.flash("addReview","Review Added Successfully");
    res.redirect(`/listings/${id}`);
}));

//delete review route
router.delete("/:reviewId",WrapAsync(async(req,res)=>{
    let { id , reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);

    await Listing.findByIdAndUpdate(id,{$pull :{reviews : reviewId}});
    req.flash("deleteReview","Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;