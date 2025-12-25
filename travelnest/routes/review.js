const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync");
const {validateReview ,isLoggedIn, isAuthor} = require("../middleware");
const reviewController = require("../controllers/review");


//reviews route
router.post("/",isLoggedIn, validateReview,WrapAsync(reviewController.createRoute));

//delete review route
router.delete("/:reviewId",isLoggedIn ,isAuthor ,WrapAsync(reviewController.deleteRoute));

module.exports = router;