const express = require("express");
const router = express.Router();

router.get("/admin-logout", (req, res) => {
  res
    .clearCookie("admin-auth", {
      httpOnly: true,
      path: "/",
    })
    .redirect(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`);
});

module.exports = router;
