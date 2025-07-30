const pool = require("../db");

const getAllReservations = async () => {
  const result = await pool.query(
    "SELECT * FROM reservations ORDER BY start_date"
  );
  return result.rows;
};

const getReservationsByVilla = async (villa_id) => {
  const result = await pool.query(
    "SELECT * FROM reservations WHERE villa_id = $1 ORDER BY start_date",
    [villa_id]
  );
  return result.rows;
};

const createReservation = async ({
  villa_id,
  start_date,
  end_date,
  guest_name,
  source,
}) => {
  const result = await pool.query(
    `INSERT INTO reservations (villa_id, start_date, end_date, guest_name, source)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [villa_id, start_date, end_date, guest_name, source]
  );
  return result.rows[0];
};

const updateReservation = async (
  id,
  { villa_id, start_date, end_date, guest_name, source }
) => {
  const result = await pool.query(
    `UPDATE reservations
     SET villa_id = $1, start_date = $2, end_date = $3, guest_name = $4, source = $5
     WHERE id = $6 RETURNING *`,
    [villa_id, start_date, end_date, guest_name, source, id]
  );
  return result.rows[0];
};

const deleteReservation = async (id) => {
  await pool.query("DELETE FROM reservations WHERE id = $1", [id]);
};

module.exports = {
  getAllReservations,
  getReservationsByVilla,
  createReservation,
  updateReservation,
  deleteReservation,
};
