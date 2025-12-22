const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchmema = new Schema({
    comment : {
        type : String,
        required : true,
     },
     rating : {
        type : Number,
        required : true,
     },
     created_at : {
        type : Date,
     }
});

const Review = new mongoose.model("Review",reviewSchmema);

module.exports = Review;