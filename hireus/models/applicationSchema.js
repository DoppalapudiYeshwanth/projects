const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    candidateId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Candidate",
        required : true,
    },
    jobId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Job",
        required : true,
    },
    status : {
        type : String,
        enum: ["applied", "shortlisted", "rejected"],
        default: "applied",
        required : true,
    },
    appliedAt : {
        type : Date,
        default: Date.now,
    },
});

applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });
const Application = mongoose.model("Application",applicationSchema);

module.exports = Application;