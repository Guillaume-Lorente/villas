const express = require("express");
const router = express.Router();
const priceController = require("../controllers/priceController");

router.get("/", priceController.getAllPrices);
router.get("/period/:period_id", priceController.getPricesByPeriod);
router.post("/", priceController.createPrice);
router.put("/:id", priceController.updatePrice);
router.delete("/:id", priceController.deletePrice);

module.exports = router;
