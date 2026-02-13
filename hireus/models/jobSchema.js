const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    requiredSkills : {
        type : Array,
        required : true,
    },
    experienceLevel :{
        type : String,
        required : true,
    },
    jobType : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "People",
    required: true,
    },
    createdAt : {
        type : Date,
        required : true,
    },
}); 

const Job = mongoose.model("Job",jobSchema);

module.exports = Job;