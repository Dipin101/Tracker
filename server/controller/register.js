const User = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    console.log(newUser);

    await newUser.save(); // saves user in MongoDB
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = register;
