const Job = require("../models/jobSchema");

const getAllJobs = async (req,res,next)=>{
    try{
        const jobs  = await Job.find();
        res.render("jobViews/home.ejs", { jobs });
    }
    catch(err){
        next(err);
    }
};

const createForm = (req,res)=>{
    res.render("jobViews/create.ejs",{Job});
};

const createJob = async(req,res,next)=>{
    try{
    const job = {
        title: req.body.Job.title,
        description: req.body.Job.description,
        requiredSkills: req.body.Job.requiredSkills,
        experienceLevel: req.body.Job.experienceLevel,
        jobType: req.body.Job.jobType,
        location: req.body.Job.location,
        createdAt : Date(),
    }
    const newJob = new Job(job);
    await newJob.save();
    res.redirect("/home");
    }
    catch(err){
        next(err);
    }
};

const getSingleJob = async(req,res,next)=>{
    try{
    let id = req.params.id;
    let job = await Job.findById(id);
    res.render("jobViews/detail.ejs",{job});
    }
    catch(err){
        next(err);
    }
};

const updateForm = async(req,res,next)=>{
    try{
    let id = req.params.id;
    let job = await Job.findById(id);
    res.render("jobViews/update.ejs",{job});
    }
    catch(err){
        next(err);
    }
};

const updateJob = async(req,res,next)=>{
    try {
    let id = req.params.id; 
    const job = {
        title: req.body.Job.title,
        description: req.body.Job.description,
        requiredSkills: req.body.Job.requiredSkills,
        experienceLevel: req.body.Job.experienceLevel,
        jobType: req.body.Job.jobType,
        location: req.body.Job.location,
    }
    await Job.findByIdAndUpdate(id, job, { new: true });
    res.redirect("/home");
     } catch (err) {
        next(err);
  }
};

const deleteJob = async(req,res,next)=>{
    try{
    let id = req.params.id;
    await Job.findByIdAndDelete(id);
    res.redirect("/home");
    }
    catch(err){
        next(err);
    }
}; 

module.exports = {getAllJobs,getSingleJob,createForm,createJob,updateForm,updateJob,deleteJob};