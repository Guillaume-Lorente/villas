const express = require("express");
const router = express.Router();
const { SignJWT } = require("jose");

// Clé secrète JWT depuis .env
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

router.post("/admin-login", async (req, res) => {
  const { password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Mot de passe incorrect" });
  }

  try {
    const token = await new SignJWT({ admin: true })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    // Définir le cookie
    res.cookie("admin-auth", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 jours
      path: "/",
      sameSite: "lax",
      secure: true, // désactive en dev local si besoin
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Erreur JWT:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
