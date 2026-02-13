const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const candidateController = require("../controllers/CandidateController");

const { protect, authorize } = require("../middleware/authMiddleware");

/* Candidate fills profile */
router.get(
  "/candidateInput",
  protect,
  authorize("candidate"),
  candidateController.candidateDetailsForm
);

router.post(
  "/candidateInput",
  protect,
  authorize("candidate"),
  upload.single("resume"),
  candidateController.CandidateDetailsUpload
);

/* HR can view all candidates */
router.get(
  "/candidates",
  protect,
  authorize("hr"),
  candidateController.getAllCandidates
);

router.get("/home/:id",candidateController.getSingleJob);

module.exports = router;
