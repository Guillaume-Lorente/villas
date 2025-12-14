const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

router.post("/admin-login", (req, res) => {
  const { password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Mot de passe incorrect" });
  }

  try {
    const token = jwt.sign({ admin: true }, secret, { expiresIn: "7d" });

    res.cookie("admin-auth", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      secure: true
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Erreur JWT:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
