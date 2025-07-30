const pool = require("../db");

const getAllPrices = async () => {
  const result = await pool.query("SELECT * FROM prices");
  return result.rows;
};

const getPricesByPeriod = async (period_id) => {
  const result = await pool.query("SELECT * FROM prices WHERE period_id = $1", [
    period_id,
  ]);
  return result.rows;
};

const createPrice = async ({
  period_id,
  room_count,
  price_per_night,
  includes_sofa_bed,
}) => {
  const result = await pool.query(
    `INSERT INTO prices (period_id, room_count, price_per_night, includes_sofa_bed)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [period_id, room_count, price_per_night, includes_sofa_bed]
  );
  return result.rows[0];
};

const updatePrice = async (
  id,
  { period_id, room_count, price_per_night, includes_sofa_bed }
) => {
  const result = await pool.query(
    `UPDATE prices 
     SET period_id = $1, room_count = $2, price_per_night = $3, includes_sofa_bed = $4
     WHERE id = $5 RETURNING *`,
    [period_id, room_count, price_per_night, includes_sofa_bed, id]
  );
  return result.rows[0];
};

const deletePrice = async (id) => {
  await pool.query("DELETE FROM prices WHERE id = $1", [id]);
};

module.exports = {
  getAllPrices,
  getPricesByPeriod,
  createPrice,
  updatePrice,
  deletePrice,
};
