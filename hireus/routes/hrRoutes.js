
const express = require("express");
const router = express.Router();

const hrController = require("../controllers/hrController");
const validateJob = require("../middleware/validateJob");
const { protect, authorize } = require("../middleware/authMiddleware");


// Home page – list all jobs
router.get("/home",hrController.getAllJobs);

// Show create form
router.get("/home/create",protect, authorize("hr"), hrController.createForm);

// Create job (with Joi validation)
router.post("/home/create",protect, authorize("hr"), validateJob, hrController.createJob);

// Job detail page
router.get("/home/:id",hrController.getSingleJob);

// Show update form
router.get("/home/:id/update", protect, authorize("hr"),hrController.updateForm);

// Update job (with Joi validation)
router.put("/home/:id/update",protect, authorize("hr"), validateJob, hrController.updateJob);

// Delete job
router.delete("/home/:id/delete",protect, authorize("hr"), hrController.deleteJob);

//hr posted jobs
router.get(
  "/hr/myjobs",
  protect,
  authorize("hr"),
  hrController.getMyJobs
);

module.exports = router;
