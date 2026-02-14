const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
        required: true,
    },

    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : String,
    },
    resumeUrl : {
        type : String,
        required : true,
    },
    skills : {
        type : [String],
        required : true,
    },
},
{
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidate",candidateSchema);

module.exports = Candidate;