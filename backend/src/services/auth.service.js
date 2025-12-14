const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const INVALID_CREDENTIALS = "Invalid credentials";

const registerUser = async ({ name, email, password }) => {
  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

module.exports = { registerUser };

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};
module.exports = { registerUser, loginUser };
