const express = require("express");
const { addSweet } = require("../controllers/sweet.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

const router = express.Router();

router.post("/", protect, adminOnly, addSweet);

module.exports = router;
