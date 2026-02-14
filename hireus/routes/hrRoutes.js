
const express = require("express");
const router = express.Router();

const hrController = require("../controllers/hrController");
const applicationController = require("../controllers/applicationController");
const validateJob = require("../middleware/validateJob");
const { protect, authorize } = require("../middleware/authMiddleware");



router.get("/home",hrController.getAllJobs);

router.get("/home/create",protect, authorize("hr"), hrController.createForm);

router.post("/home/create",protect, authorize("hr"), validateJob, hrController.createJob);

router.get("/home/:id",hrController.getSingleJob);

router.get("/home/:id/update", protect, authorize("hr"),hrController.updateForm);

router.put("/home/:id/update",protect, authorize("hr"), validateJob, hrController.updateJob);

router.delete("/home/:id/delete",protect, authorize("hr"), hrController.deleteJob);

router.get(
  "/hr/myjobs",
  protect,
  authorize("hr"),
  hrController.getMyJobs
);

router.get(
  "/hr/jobs/:id/applications",
  protect,
  authorize("hr"),
  applicationController.jobApplications
);


module.exports = router;
