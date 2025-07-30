const express = require("express");
const router = express.Router();
const periodController = require("../controllers/periodController");

router.get("/", periodController.getAllPeriods);
router.get("/villa/:villa_id", periodController.getPeriodsByVilla);
router.post("/", periodController.createPeriod);
router.put("/:id", periodController.updatePeriod);
router.delete("/:id", periodController.deletePeriod);

module.exports = router;
