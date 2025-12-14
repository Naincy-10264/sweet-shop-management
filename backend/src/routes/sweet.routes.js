const express = require("express");
const { addSweet, getAllSweets } = require("../controllers/sweet.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

const router = express.Router();

router.post("/", protect, adminOnly, addSweet);
router.get("/", protect, getAllSweets);

module.exports = router;
