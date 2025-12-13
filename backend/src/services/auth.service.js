const bcrypt = require("bcryptjs");
const User = require("../models/User");

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
