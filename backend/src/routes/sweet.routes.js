const express = require("express");
const { addSweet, getAllSweets, searchSweets, purchaseSweet } = require("../controllers/sweet.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

const router = express.Router();

router.get("/search", protect, searchSweets);
router.get("/", protect, getAllSweets);
router.post("/", protect, adminOnly, addSweet);
router.post("/:id/purchase", protect, purchaseSweet);

module.exports = router;
