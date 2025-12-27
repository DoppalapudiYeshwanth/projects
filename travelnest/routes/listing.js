const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const {isLoggedIn ,isOwner ,validateListing} = require("../middleware");
const listingController = require("../controllers/listing");
const multer  = require('multer');
const {storage} = require("../cloudConfig");
const upload = multer({ storage });


// show route and create route
router.route("/")
    .get(WrapAsync (listingController.showRoute))
    .post(isLoggedIn,upload.array('Listing[images]',5),validateListing, WrapAsync(listingController.createRoute));
  
//delete image route
router.delete(
  "/:id/images/:imageId",
  isLoggedIn,
  isOwner,
  WrapAsync(listingController.deleteImage)
);

//new route
router.get("/new",isLoggedIn,listingController.newRoute);

//edit route
router.get("/:id/edit", isLoggedIn,isOwner,validateListing,WrapAsync (listingController.editRoute));

//delete route
router.delete("/:id/delete",isLoggedIn,isOwner,WrapAsync(listingController.deleteRoute));

//update route and detailed route
router.route("/:id")
    .get(WrapAsync(listingController.detailedRoute))
    .put(isLoggedIn,isOwner,upload.array('Listing[images]'),validateListing,WrapAsync(listingController.updateRoute));

module.exports = router;