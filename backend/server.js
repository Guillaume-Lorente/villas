const express = require("express");
const cors = require("cors");
require("dotenv").config();

const villasRoutes = require("./routes/villas");
const pricesRoutes = require("./routes/prices");
const periodsRoutes = require("./routes/periods");
const reservationsRoutes = require("./routes/reservations");
const promotionsRoutes = require("./routes/promotions");
const syncRoutes = require("./routes/sync");
const calculatePriceRoutes = require("./routes/calculatePrice");
const icalRoutes = require("./routes/ical");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/villas", villasRoutes);
app.use("/api/prices", pricesRoutes);
app.use("/api/periods", periodsRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/promotions", promotionsRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/calculate-price", calculatePriceRoutes);
app.use("/api/ical", icalRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});

// ⏱ Lancement du cron job de sync iCal
const startICalSyncJob = require("./syncJob");
startICalSyncJob();
