const Sweet = require("../models/Sweet");

const addSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  const sweet = await Sweet.create({
    name,
    category,
    price,
    quantity,
  });

  return res.status(201).json(sweet);
};

const getAllSweets = async (req, res) => {
  const sweets = await Sweet.find();
  return res.status(200).json(sweets);
};

module.exports = { addSweet, getAllSweets };
