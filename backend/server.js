const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const { verifyAdminToken } = require("./middleware/auth");

const villasRoutes = require("./routes/villas");
const pricesRoutes = require("./routes/prices");
const periodsRoutes = require("./routes/periods");
const reservationsRoutes = require("./routes/reservations");
const promotionsRoutes = require("./routes/promotions");
const syncRoutes = require("./routes/sync");
const calculatePriceRoutes = require("./routes/calculatePrice");
const icalRoutes = require("./routes/ical");
const adminLoginRoute = require("./routes/adminLogin");
const adminLogoutRoute = require("./routes/adminLogout");
const contactRoute = require("./routes/contact");
const postsRoutes = require("./routes/posts");
const promoRoutes = require("./routes/promos");
const reservationEmailRoute = require("./routes/reservationEmail");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.villas-grande-anse.com"
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/villas", villasRoutes);
app.use("/api/prices", pricesRoutes);
app.use("/api/periods", periodsRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/promotions", promotionsRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/calculate-price", calculatePriceRoutes);
app.use("/api/ical", icalRoutes);

// Routes publiques
app.use("/api", adminLoginRoute);
app.use("/api", adminLogoutRoute);
app.use("/api", contactRoute);
app.use("/api/reservation", reservationEmailRoute);

// Routes protégées
app.use("/api/posts", verifyAdminToken, postsRoutes);
app.use("/api/promo", promoRoutes);

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});

// ⏱ Lancement du cron job de sync iCal
const startICalSyncJob = require("./syncJob");
startICalSyncJob();
