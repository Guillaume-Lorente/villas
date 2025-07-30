const express = require("express");
const router = express.Router();
const { calculatePrice } = require("../controllers/calculatePriceController");

router.post("/", calculatePrice);

module.exports = router;
