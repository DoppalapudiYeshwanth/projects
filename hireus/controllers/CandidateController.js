const Candidate = require("../models/candidateSchema");
const Application = require("../models/applicationSchema");


const getSingleJob = async(req,res,next)=>{
    try{
    let id = req.params.id;
    let job = await Job.findById(id);
    res.render("hrViews/detail.ejs",{job});
    }
    catch(err){
        next(err);
    }
};

const myApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({
      candidateId: req.user._id,
    }).populate("jobId");

    res.render("candidateViews/myApplications.ejs", { applications });
  } catch (err) {
    next(err);
  }
};

const candidateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const candidate = await Candidate.findOne({ userId });

    if (!candidate) {
      return res.send("Candidate profile not found.");
    }
    const totalApplied = await Application.countDocuments({
      candidateId: candidate._id,
    });

    const shortlisted = await Application.countDocuments({
      candidateId: candidate._id,
      status: "shortlisted",
    });

    const rejected = await Application.countDocuments({
      candidateId: candidate._id,
      status: "rejected",
    });

    res.render("candidateViews/profile.ejs", {
      candidate,
      totalApplied,
      shortlisted,
      rejected,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {getSingleJob,myApplications,candidateProfile};