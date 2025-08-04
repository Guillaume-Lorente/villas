const jwt = require("jsonwebtoken");

const protectedPaths = ["/api/admin", "/api/admin/create", "/api/admin/edit"];

function verifyAdminToken(req, res, next) {
  const token = req.cookies["admin-auth"];
  const currentPath = req.path;

  const pathIsProtected = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  if (!pathIsProtected || currentPath === "/api/admin/login") {
    return next();
  }

  if (!token) {
    return res.status(401).json({ message: "Non authentifié (pas de token)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
}

module.exports = { verifyAdminToken };
