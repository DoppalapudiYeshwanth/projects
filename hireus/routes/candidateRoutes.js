const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/CandidateController");
const applicationController = require("../controllers/applicationController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get(
  "/candidate/applications",
  protect,
  authorize("candidate"),
  applicationController.myApplications
);
router.get(
  "/candidate/profile",
  protect,
  authorize("candidate"),
  candidateController.candidateProfile
);

router.get("/home/:id",candidateController.getSingleJob);

module.exports = router;
