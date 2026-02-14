const Application = require("../models/applicationSchema");
const Candidate = require("../models/candidateSchema");

const applyToJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const candidateProfile = await Candidate.findOne({
        userId: req.user._id,
    });
    if (!candidateProfile) {
      return res.send("Candidate profile not found.");
    }
    const candidateId = candidateProfile._id;
    const alreadyApplied = await Application.findOne({
      jobId,
      candidateId,
    });
    if (alreadyApplied) {
      return res.send("You already applied.");
    }
    await Application.create({
      jobId,
      candidateId,
    });
    res.redirect("/candidate/applications");
  } catch (err) {
    next(err);
  }
};


const myApplications = async (req, res, next) => {
  try {
    const candidateProfile = await Candidate.findOne({
      userId: req.user._id,
    });
    if (!candidateProfile) {
      return res.send("Candidate profile not found.");
    }
    const applications = await Application.find({
      candidateId: candidateProfile._id,
    }).populate("jobId");
    res.render("candidateViews/myApplications.ejs", {
      applications,
    });
  } catch (err) {
    next(err);
  }
};


const jobApplications = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const applications = await Application.find({ jobId })
      .populate("candidateId");
    res.render("hrViews/jobApplications.ejs", { applications });
  } catch (err) {
    next(err);
  }
};


const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    await Application.findByIdAndUpdate(req.params.id, { status });
    res.redirect("/home");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  applyToJob,
  myApplications,
  jobApplications,
  updateStatus,
};
