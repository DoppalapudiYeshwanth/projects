const Candidate = require("../models/candidateSchema");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const CandidateDetailsUpload = async(req,res,next)=>{
    try{
      const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "resumes",
      resource_type: "raw",
      use_filename: true,
      unique_filename: true
    });
    fs.unlinkSync(req.file.path);

      const CandidateFormData = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        skills : req.body.skills.split(","),
        resumeUrl : result.secure_url,
        createdAt : Date(),
      }

      const candidateInput = new Candidate(CandidateFormData);
      await candidateInput.save();
      res.redirect("/home");

    }catch(err){
      next(err);
    }
};

const getAllCandidates = async(req,res,next)=>{
    try{
    let candidates = await Candidate.find();
    res.render("candidateViews/home.ejs",{candidates});
    }catch(err){
    next(err);
    }
};

const candidateDetailsForm = (req,res)=>{
    res.render("candidateViews/form.ejs");
};

module.exports = {candidateDetailsForm,CandidateDetailsUpload,getAllCandidates};