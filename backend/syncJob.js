const cron = require("node-cron");
const { syncReservations } = require("./utils/icalImporter");

function startICalSyncJob() {
  // ⏰ Tous les jours à 00:00 et 12:00
  cron.schedule("0 0,12 * * *", async () => {
    console.log("🔁 [CRON] Début de la synchronisation iCal...");

    const villaIds = [1, 2, 3];

    for (const id of villaIds) {
      try {
        await syncReservations(id);
        console.log(`✅ [CRON] Villa ${id} synchronisée`);
      } catch (err) {
        console.error(`❌ [CRON] Erreur villa ${id}:`, err.message);
      }
    }

    console.log("✅ [CRON] Sync iCal complète.");
  });
}

module.exports = startICalSyncJob;
