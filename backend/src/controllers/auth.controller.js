const { registerUser } = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await registerUser({ name, email, password });

    return res.status(201).json({
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { register };
