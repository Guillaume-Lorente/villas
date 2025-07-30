const pool = require("../db");

const getAllPeriods = async () => {
  const result = await pool.query("SELECT * FROM periods ORDER BY start_date");
  return result.rows;
};

const getPeriodsByVilla = async (villa_id) => {
  const result = await pool.query(
    "SELECT * FROM periods WHERE villa_id = $1 ORDER BY start_date",
    [villa_id]
  );
  return result.rows;
};

const createPeriod = async ({ villa_id, start_date, end_date, label }) => {
  const result = await pool.query(
    `INSERT INTO periods (villa_id, start_date, end_date, label)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [villa_id, start_date, end_date, label]
  );
  return result.rows[0];
};

const updatePeriod = async (id, { villa_id, start_date, end_date, label }) => {
  const result = await pool.query(
    `UPDATE periods 
     SET villa_id = $1, start_date = $2, end_date = $3, label = $4
     WHERE id = $5 RETURNING *`,
    [villa_id, start_date, end_date, label, id]
  );
  return result.rows[0];
};

const deletePeriod = async (id) => {
  await pool.query("DELETE FROM periods WHERE id = $1", [id]);
};

module.exports = {
  getAllPeriods,
  getPeriodsByVilla,
  createPeriod,
  updatePeriod,
  deletePeriod,
};
