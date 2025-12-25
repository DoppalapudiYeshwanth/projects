const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const {listingSchema ,reviewSchema} = require("./schema");



const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","User not logged in.");
        return res.redirect("/users/login");
    }
    next();
};
const saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl; 
    }
    next();
};
const isOwner = async (req,res,next)=>{
    let { id }= req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error","You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
const validateListing = (req,res,next)=>{
    let { error }= listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};
const validateReview = (req,res,next)=>{
    let { error }= reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};
const isAuthor = async (req,res,next)=>{
    let { reviewId }= req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currentUser._id)){
        req.flash("error","You don't have permission to delete");
        return res.redirect(`/listings/${id}`);
    }
    next();
};  

module.exports = {isLoggedIn , saveRedirectUrl , isOwner,validateListing,validateReview,isAuthor};