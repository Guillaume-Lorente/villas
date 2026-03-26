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
    url: "https://www.antillesexception.com/exvapi/getplanning/a445c0e4ae11f7915c174701b083d4acb6e99353",
  },
];

// ========== Helpers ==========

/**
 * Formate une Date JS en "yyyy-MM-dd" en utilisant les GETTERS UTC.
 * Pourquoi UTC ?
 * - Les événements all-day (VALUE=DATE) sont interprétés à minuit UTC.
 * - En restant en UTC, on évite tout décalage (±1 jour) lié au fuseau du serveur.
 */
function ymdUTC(d) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Log propre
 */
function log(prefix, msg) {
  console.log(`${prefix} ${msg}`);
}

// ========== Import principal ==========

async function syncReservations(villaId) {
  const villa = villaICalSources.find((v) => v.villaId === villaId);
  if (!villa) throw new Error(`Villa inconnue pour cet ID: ${villaId}`);

  const { url, name } = villa;
  const prefix = `📥 [villa:${villaId} ${name}]`;

  log(prefix, `Début de synchronisation`);
  let data;
  try {
    data = await ical.async.fromURL(url);
  } catch (e) {
    console.error(`${prefix} Échec de récupération iCal:`, e);
    throw e;
  }

  const events = Object.values(data).filter((e) => e.type === "VEVENT");
  log(prefix, `${events.length} événement(s) trouvé(s) dans le .ics`);

  const seenUIDs = new Set();

  await pool.query("BEGIN");
  try {
    for (const e of events) {
      // Ignore annulations explicites
      if (e.status && String(e.status).toUpperCase() === "CANCELLED") {
        continue;
      }

      if (!e.start || !e.end) {
        console.warn(`${prefix} Événement sans start/end ignoré:`, e.summary);
        continue;
      }

      // UID fiable pour l'upsert. Fallback si absent.
      const uid =
        e.uid ||
        `${e.summary || "NO-SUMMARY"}__${ymdUTC(e.start)}__${ymdUTC(e.end)}`;
      seenUIDs.add(uid);

      // IMPORTANT: on reste en UTC (VALUE=DATE) -> aucune conversion fuseau
      const startDate = ymdUTC(e.start); // DTSTART inclus
      const endDate = ymdUTC(e.end); // DTEND exclusif

      // Sanity check: end > start
      if (e.end <= e.start) {
        console.warn(
          `${prefix} Événement invalide (end <= start) ignoré:`,
          e.summary,
          startDate,
          endDate,
        );
        continue;
      }

      const guestName = e.summary || "Importé iCal";

      // Upsert par (villa_id, source, uid)
      await pool.query(
        `
        INSERT INTO reservations (villa_id, start_date, end_date, guest_name, source, uid)
        VALUES ($1, $2, $3, $4, 'ical', $5)
        ON CONFLICT (villa_id, source, uid) WHERE (source = 'ical' AND uid IS NOT NULL)
        DO UPDATE SET start_date = EXCLUDED.start_date,
                      end_date   = EXCLUDED.end_date,
                      guest_name = EXCLUDED.guest_name
        `,
        [villaId, startDate, endDate, guestName, uid],
      );

      log(prefix, `↔️  Sync: ${startDate} → ${endDate} (${guestName})`);
    }

    // Nettoyage: supprime les réservations iCal non présentes dans le .ics courant
    await pool.query(
      `
      DELETE FROM reservations
      WHERE villa_id = $1
        AND source = 'ical'
        AND uid IS NOT NULL
        AND uid <> ALL($2::text[])
      `,
      [villaId, Array.from(seenUIDs)],
    );

    await pool.query("COMMIT");
    log(prefix, `✅ Synchronisation terminée`);
  } catch (e) {
    await pool.query("ROLLBACK");
    console.error(`${prefix} ❌ Échec de synchronisation, rollback:`, e);
    throw e;
  }
}

/**
 * Pratique pour tout re-synchroniser d'un coup (les 3 villas).
 * Utilisation depuis un script/cron: require(...).syncAll();
 */
async function syncAll() {
  for (const v of villaICalSources) {
    try {
      await syncReservations(v.villaId);
    } catch (e) {
      console.error(`❌ Erreur sur villa ${v.villaId} (${v.name}):`, e);
    }
  }
}

module.exports = {
  syncReservations,
  syncAll,
  villaICalSources,
};
