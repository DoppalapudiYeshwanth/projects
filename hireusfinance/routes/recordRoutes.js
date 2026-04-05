const router = require("express").Router();
const { allowRoles } = require("../middleware/roleMiddleware");


const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");

router.post("/", allowRoles("admin", "analyst"), createRecord);
router.get("/", allowRoles("admin", "analyst", "viewer"), getRecords);
router.put("/:id", allowRoles("admin"), updateRecord);
router.delete("/:id", allowRoles("admin"), deleteRecord);

module.exports = router;