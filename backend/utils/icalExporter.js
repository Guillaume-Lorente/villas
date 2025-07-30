const { createEvents } = require("ics");
const pool = require("../db");

async function generateVillaIcs(villaId) {
  const res = await pool.query(
    `SELECT * FROM reservations WHERE villa_id = $1 ORDER BY start_date`,
    [villaId]
  );

  const events = res.rows.map((r) => {
    const startDate = new Date(r.start_date);
    const endDate = new Date(r.end_date);

    const start = [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
    ];
    const end = [
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate(),
    ];

    return {
      title: r.guest_name || "Réservation",
      start,
      end,
      description: `Source: ${r.source}`,
      location: `Villa ${r.villa_id}`,
    };
  });

  const { error, value } = createEvents(events);

  if (error) {
    console.error("❌ Erreur génération iCal:", error);
    throw new Error("Erreur génération iCal");
  }

  return value;
}

module.exports = { generateVillaIcs };
