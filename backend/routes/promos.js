const express = require("express");
const fs = require("fs");
const path = require("path");
const { verifyAdminToken } = require("../middleware/auth");

const router = express.Router();
const promoPath = path.join(__dirname, "../data/promoConfig.json");

// ✅ GET – Public (affiché sur le site)
router.get("/", (req, res) => {
  try {
    const json = fs.readFileSync(promoPath, "utf-8");
    const data = JSON.parse(json);
    res.json(data);
  } catch (err) {
    console.error("Erreur lecture promoConfig:", err);
    res.status(500).json({ error: "Impossible de lire les données" });
  }
});

// 🔐 POST – Admin uniquement
router.post("/", verifyAdminToken, (req, res) => {
  try {
    const body = req.body;
    fs.writeFileSync(promoPath, JSON.stringify(body, null, 2), "utf-8");
    res.json({ success: true });
  } catch (err) {
    console.error("Erreur écriture promoConfig:", err);
    res.status(500).json({ error: "Impossible d'enregistrer les données" });
  }
});

module.exports = router;
