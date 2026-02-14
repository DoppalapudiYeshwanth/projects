const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const applicationController = require("../controllers/applicationController");

router.post(
  "/jobs/:id/apply",
  protect,
  authorize("candidate"),
  applicationController.applyToJob
);

router.get(
  "/hr/jobs/:id/applications",
  protect,
  authorize("hr"),
  applicationController.jobApplications
);


router.put(
  "/hr/applications/:id/status",
  protect,
  authorize("hr"),
  applicationController.updateStatus
);

module.exports = router;
