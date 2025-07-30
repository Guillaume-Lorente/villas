const express = require("express");
const router = express.Router();
const { syncICal } = require("../controllers/syncController");

router.get("/", syncICal);

module.exports = router;
