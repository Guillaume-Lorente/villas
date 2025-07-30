const priceModel = require("../models/priceModel");

const getAllPrices = async (req, res) => {
  try {
    const prices = await priceModel.getAllPrices();
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPricesByPeriod = async (req, res) => {
  try {
    const { period_id } = req.params;
    const prices = await priceModel.getPricesByPeriod(period_id);
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPrice = async (req, res) => {
  try {
    const newPrice = await priceModel.createPrice(req.body);
    res.status(201).json(newPrice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await priceModel.updatePrice(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePrice = async (req, res) => {
  try {
    const { id } = req.params;
    await priceModel.deletePrice(id);
    res.json({ message: "Price deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPrices,
  getPricesByPeriod,
  createPrice,
  updatePrice,
  deletePrice,
};
