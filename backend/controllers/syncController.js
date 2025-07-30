const { syncReservations } = require("../utils/icalImporter");

exports.syncICal = async (req, res) => {
  const villaId = parseInt(req.query.villaId, 10);
  if (!villaId) {
    return res.status(400).json({ error: "Paramètre villaId requis" });
  }

  try {
    await syncReservations(villaId); // Appel avec l'ID de la villa
    res.status(200).json({ message: "Synchronisation iCal réussie" });
  } catch (err) {
    console.error("Erreur de synchronisation iCal :", err);
    res.status(500).json({ error: "Erreur lors de la synchronisation iCal" });
  }
};
