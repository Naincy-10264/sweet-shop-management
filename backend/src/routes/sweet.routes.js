const express = require("express");
const { addSweet, getAllSweets, searchSweets, purchaseSweet, restockSweet, updateSweet, deleteSweet } = require("../controllers/sweet.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

const router = express.Router();

router.get("/search", protect, searchSweets);
router.get("/", protect, getAllSweets);
router.post("/", protect, adminOnly, addSweet);
router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, adminOnly, restockSweet);
router.put("/:id", protect, adminOnly, updateSweet);
router.delete("/:id", protect, adminOnly, deleteSweet);


module.exports = router;
