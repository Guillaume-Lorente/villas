const express = require("express");
const router = express.Router();
const { generateVillaIcs } = require("../utils/icalExporter");

router.get("/villa/:villaId", async (req, res) => {
  const { villaId } = req.params;

  try {
    const icsString = await generateVillaIcs(Number(villaId));
    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.send(icsString);
  } catch (err) {
    console.error("Erreur export iCal:", err);
    res.status(500).json({ error: "Erreur génération iCal" });
  }
});

module.exports = router;
