const pool = require("../db");

exports.calculatePrice = async (req, res) => {
  const { villaId, startDate, endDate, room_count, includes_sofa_bed } =
    req.body;

  try {
    // 1. Récupération des prix standards
    const priceResult = await pool.query(
      `
      SELECT p.price_per_night, per.start_date, per.end_date
      FROM prices p
      JOIN periods per ON p.period_id = per.id
      WHERE per.villa_id = $1
        AND p.room_count = $2
        AND p.includes_sofa_bed = $3
      `,
      [villaId, room_count, includes_sofa_bed]
    );
    const priceMap = priceResult.rows;

    if (!priceMap.length) {
      return res.status(404).json({ error: "Aucun tarif trouvé." });
    }

    // 2. Récupération des promotions actives
const promoResult = await pool.query(
  `
  SELECT start_date, end_date, discount_percent
  FROM promotions
  WHERE villa_id = $1 AND active = true
  `,
  [villaId]
);
const promotions = promoResult.rows;

const start = new Date(startDate);
const end = new Date(endDate);
start.setHours(0, 0, 0, 0);
end.setHours(0, 0, 0, 0);

let totalBeforeDiscount = 0;
let totalAfterDiscount = 0;
let countNights = 0;
let maxDiscountPercent = 0;

let current = new Date(start);
current.setHours(0, 0, 0, 0);

while (current < end) {
  const matchedPrice = priceMap.find((entry) => {
    const periodStart = new Date(entry.start_date);
    const periodEnd = new Date(entry.end_date);
    periodStart.setHours(0, 0, 0, 0);
    periodEnd.setHours(0, 0, 0, 0);

    return current >= periodStart && current <= periodEnd;
  });

  if (!matchedPrice) {
    return res.status(400).json({
      error:
        "Les tarifs ne sont pas encore disponibles pour certaines des dates sélectionnées. Veuillez nous contacter via le formulaire.",
    });
  }

  const basePrice = parseFloat(matchedPrice.price_per_night);

  const applicablePromo = promotions.find((promo) => {
    const promoStart = new Date(promo.start_date);
    const promoEnd = new Date(promo.end_date);
    promoStart.setHours(0, 0, 0, 0);
    promoEnd.setHours(0, 0, 0, 0);

    return current >= promoStart && current <= promoEnd;
  });

  let finalPrice = basePrice;
  if (applicablePromo) {
    finalPrice = basePrice * (1 - applicablePromo.discount_percent / 100);
    if (applicablePromo.discount_percent > maxDiscountPercent) {
      maxDiscountPercent = applicablePromo.discount_percent;
    }
  }

  totalBeforeDiscount += basePrice;
  totalAfterDiscount += finalPrice;
  countNights += 1;

  // jour suivant
  current.setDate(current.getDate() + 1);
  current.setHours(0, 0, 0, 0);
}

    // 3. Appliquer minimum 7 nuits
    if (countNights < 7 && countNights > 0) {
      const avgBefore = totalBeforeDiscount / countNights;
      const avgAfter = totalAfterDiscount / countNights;
      totalBeforeDiscount = avgBefore * 7;
      totalAfterDiscount = avgAfter * 7;
    }

    res.json({
      totalBeforeDiscount: parseFloat(totalBeforeDiscount.toFixed(2)),
      totalAfterDiscount: parseFloat(totalAfterDiscount.toFixed(2)),
      discountApplied: totalBeforeDiscount > totalAfterDiscount,
      discountPercent: maxDiscountPercent || null,
    });
  } catch (err) {
    console.error("Erreur calcul prix:", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
