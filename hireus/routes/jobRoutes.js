
const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");
const validateJob = require("../middleware/validateJob");

// Home page – list all jobs
router.get("/home", jobController.getAllJobs);

// Show create form
router.get("/home/create", jobController.createForm);

// Create job (with Joi validation)
router.post("/home/create", validateJob, jobController.createJob);

// Job detail page
router.get("/home/:id", jobController.getSingleJob);

// Show update form
router.get("/home/:id/update", jobController.updateForm);

// Update job (with Joi validation)
router.put("/home/:id/update", validateJob, jobController.updateJob);

// Delete job
router.delete("/home/:id/delete", jobController.deleteJob);

module.exports = router;
