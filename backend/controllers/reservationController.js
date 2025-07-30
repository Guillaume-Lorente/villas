const reservationModel = require("../models/reservationModel");

const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationModel.getAllReservations();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getReservationsByVilla = async (req, res) => {
  try {
    const { villa_id } = req.params;
    const reservations = await reservationModel.getReservationsByVilla(
      villa_id
    );
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createReservation = async (req, res) => {
  try {
    const reservation = await reservationModel.createReservation(req.body);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await reservationModel.updateReservation(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await reservationModel.deleteReservation(id);
    res.json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllReservations,
  getReservationsByVilla,
  createReservation,
  updateReservation,
  deleteReservation,
};
