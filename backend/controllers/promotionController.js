const promotionModel = require("../models/promotionModel");

const getAllPromotions = async (req, res) => {
  try {
    const promotions = await promotionModel.getAllPromotions();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPromotionsByVilla = async (req, res) => {
  try {
    const { villa_id } = req.params;
    const promotions = await promotionModel.getPromotionsByVilla(villa_id);
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPromotion = async (req, res) => {
  try {
    const promotion = await promotionModel.createPromotion(req.body);
    res.status(201).json(promotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await promotionModel.updatePromotion(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    await promotionModel.deletePromotion(id);
    res.json({ message: "Promotion deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPromotions,
  getPromotionsByVilla,
  createPromotion,
  updatePromotion,
  deletePromotion,
};
