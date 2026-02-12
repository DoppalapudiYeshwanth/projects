const express = require("express");
const router = express.Router();
const validateCandidate = require("../middleware/validateCandidate")
const upload = require("../middleware/multer");

const candidateController = require("../controllers/CandidateController");

router.get("/candidateInput",candidateController.candidateDetailsForm);

router.post("/candidateInput",upload.single("resume"),candidateController.CandidateDetailsUpload);

router.get("/candidates",candidateController.getAllCandidates);

module.exports = router;
