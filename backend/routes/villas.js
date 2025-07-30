const express = require("express");
const router = express.Router();
const villasController = require("../controllers/villasController");

router.get("/", villasController.getAll);
router.get("/:id", villasController.getById);
router.post("/", villasController.create);
router.put("/:id", villasController.update);
router.delete("/:id", villasController.remove);

module.exports = router;
