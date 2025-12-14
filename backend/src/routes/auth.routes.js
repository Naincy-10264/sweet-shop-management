const express = require("express");
const { register,login } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
