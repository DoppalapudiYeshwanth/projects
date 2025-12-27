const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    images: [{
    filename: {
      type: String,
      required : true,
    },
    url: {
      type: String,
      required : true,
    },
    }],
    price : {
        type : Number,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    country : {
        type : String,
        required : true,
    },
    reviews :[
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner :{
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    category: {
    type: String,
    required: true,
    enum: [
      "Trending",
      "Destinations",
      "Hotels",
      "Adventures",
      "Trips",
      "Guides",
      "Car Rentals",
      "Memories",
    ],
  },
});

//middleware to delete the review associated with the listing
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({ _id : {$in :listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;