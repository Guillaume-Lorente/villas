const pool = require("../db");

// GET All villas
async function getAllVillas() {
  const result = await pool.query("SELECT * FROM villas ORDER BY id");
  return result.rows;
}

// GET One villa by ID
async function getVillaById(id) {
  const result = await pool.query("SELECT * FROM villas WHERE id = $1", [id]);
  return result.rows[0];
}

// CREATE
async function createVilla({ name }) {
  const result = await pool.query(
    "INSERT INTO villas (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
}

// UPDATE
async function updateVilla(id, { name }) {
  const result = await pool.query(
    "UPDATE villas SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return result.rows[0];
}

// DELETE
async function deleteVilla(id) {
  const result = await pool.query("DELETE FROM villas WHERE id = $1", [id]);
  return result.rowCount > 0;
}

module.exports = {
  getAllVillas,
  getVillaById,
  createVilla,
  updateVilla,
  deleteVilla,
};
