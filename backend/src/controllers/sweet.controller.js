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

const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sweets = await Sweet.find(query);
  return res.status(200).json(sweets);
};
const purchaseSweet = async (req, res) => {
  const { id } = req.params;

  const sweet = await Sweet.findById(id);
  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  return res.status(200).json(sweet);
};

const restockSweet = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const sweet = await Sweet.findById(id);
  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  sweet.quantity += Number(quantity);
  await sweet.save();

  return res.status(200).json(sweet);
};



module.exports = { addSweet, getAllSweets, searchSweets, purchaseSweet, restockSweet };
