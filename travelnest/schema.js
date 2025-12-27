const Joi = require("joi");

const listingSchema = Joi.object({
    Listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        image : Joi.string().allow("",null),
        price : Joi.number().required().min(0),
        location : Joi.string().required(),
        country : Joi.string().required(),
        category: Joi.string()
      .valid(
        "Trending",
        "Destinations",
        "Hotels",
        "Adventures",
        "Trips",
        "Guides",
        "Car Rentals",
        "Memories"
      )
      .required(),
    }).required()
});
module.exports = {listingSchema};

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        comment : Joi.string().required(),
        rating : Joi.number().required().min(0).max(5),
    }).required()
});