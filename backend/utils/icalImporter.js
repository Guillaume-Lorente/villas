const ical = require("node-ical");
const pool = require("../db");

const villaICalSources = [
  {
    villaId: 1,
    name: "Akamapa",
    url: "https://www.antillesexception.com/exvapi/getplanning/327114416bcb7a383bd5beff5154972aeeb7e5",
  },
  {
    villaId: 2,
    name: "Tilamp-Tilamp",
    url: "https://www.antillesexception.com/exvapi/getplanning/c03b54dc435f577ae440a51d3138e43d5b7864",
  },
  {
    villaId: 3,
    name: "Iguana",
    url: "https://ical-link-palmier.ics",
  },
];

async function syncReservations(villaId) {
  const villa = villaICalSources.find((v) => v.villaId === villaId);
  if (!villa) throw new Error("Villa inconnue pour cet ID");

  const { url, name } = villa;

  console.log(`📥 Synchronisation de ${name} (ID: ${villaId})`);

  const data = await ical.async.fromURL(url);
  const events = Object.values(data).filter((e) => e.type === "VEVENT");

  for (const event of events) {
    const adjustedStart = new Date(event.start);
    adjustedStart.setDate(adjustedStart.getDate() + 2); // Décale de 2 jours

    const startDate = adjustedStart.toISOString().split("T")[0];
    const endDate = event.end.toISOString().split("T")[0];

    const exists = await pool.query(
      `
      SELECT id FROM reservations
      WHERE villa_id = $1 AND start_date = $2 AND end_date = $3
      `,
      [villaId, startDate, endDate]
    );

    if (exists.rows.length === 0) {
      await pool.query(
        `
        INSERT INTO reservations (villa_id, start_date, end_date, guest_name, source)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [villaId, startDate, endDate, event.summary || "Importé iCal", "ical"]
      );
      console.log(`✅ Ajouté : ${startDate} → ${endDate}`);
    } else {
      console.log(`⏩ Déjà présent : ${startDate} → ${endDate}`);
    }
  }

  console.log("✅ Synchronisation terminée");
}

// Exporte bien sous forme d'objet avec la bonne clé
module.exports = {
  syncReservations,
};
