const periodModel = require("../models/periodModel");

const getAllPeriods = async (req, res) => {
  try {
    const periods = await periodModel.getAllPeriods();
    res.json(periods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPeriodsByVilla = async (req, res) => {
  try {
    const { villa_id } = req.params;
    const periods = await periodModel.getPeriodsByVilla(villa_id);
    res.json(periods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPeriod = async (req, res) => {
  try {
    const newPeriod = await periodModel.createPeriod(req.body);
    res.status(201).json(newPeriod);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePeriod = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await periodModel.updatePeriod(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePeriod = async (req, res) => {
  try {
    const { id } = req.params;
    await periodModel.deletePeriod(id);
    res.json({ message: "Period deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPeriods,
  getPeriodsByVilla,
  createPeriod,
  updatePeriod,
  deletePeriod,
};
