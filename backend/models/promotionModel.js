const pool = require("../db");

const getAllPromotions = async () => {
  const result = await pool.query(
    "SELECT * FROM promotions ORDER BY start_date"
  );
  return result.rows;
};

const getPromotionsByVilla = async (villa_id) => {
  const result = await pool.query(
    "SELECT * FROM promotions WHERE villa_id = $1 ORDER BY start_date",
    [villa_id]
  );
  return result.rows;
};

const createPromotion = async ({
  villa_id,
  start_date,
  end_date,
  discount_percent,
}) => {
  const result = await pool.query(
    `INSERT INTO promotions (villa_id, start_date, end_date, discount_percent)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [villa_id, start_date, end_date, discount_percent]
  );
  return result.rows[0];
};

const updatePromotion = async (
  id,
  { villa_id, start_date, end_date, discount_percent }
) => {
  const result = await pool.query(
    `UPDATE promotions
     SET villa_id = $1, start_date = $2, end_date = $3, discount_percent = $4
     WHERE id = $5 RETURNING *`,
    [villa_id, start_date, end_date, discount_percent, id]
  );
  return result.rows[0];
};

const deletePromotion = async (id) => {
  await pool.query("DELETE FROM promotions WHERE id = $1", [id]);
};

module.exports = {
  getAllPromotions,
  getPromotionsByVilla,
  createPromotion,
  updatePromotion,
  deletePromotion,
};
