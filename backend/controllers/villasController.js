const Villa = require("../models/villasModel");

exports.getAll = async (req, res) => {
  try {
    const villas = await Villa.getAllVillas();
    res.json(villas);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des villas" });
  }
};

exports.getById = async (req, res) => {
  try {
    const villa = await Villa.getVillaById(req.params.id);
    if (!villa) return res.status(404).json({ error: "Villa non trouvée" });
    res.json(villa);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Le nom est requis" });

    const newVilla = await Villa.createVilla({ name });
    res.status(201).json(newVilla);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création" });
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedVilla = await Villa.updateVilla(req.params.id, { name });

    if (!updatedVilla)
      return res.status(404).json({ error: "Villa non trouvée" });
    res.json(updatedVilla);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
};

exports.remove = async (req, res) => {
  try {
    const success = await Villa.deleteVilla(req.params.id);
    if (!success) return res.status(404).json({ error: "Villa non trouvée" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
