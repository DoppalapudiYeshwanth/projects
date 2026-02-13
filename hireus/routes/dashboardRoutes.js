const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

/* Candidate Dashboard → Redirect to Jobs */
router.get(
  "/candidate/dashboard",
  protect,
  authorize("candidate"),
  (req, res) => {
    return res.redirect("/home");
  }
);

/* HR Dashboard → Redirect to HR Jobs Panel */
router.get(
  "/hr/dashboard",
  protect,
  authorize("hr"),
  (req, res) => {
    return res.redirect("/home");
  }
);

module.exports = router;
