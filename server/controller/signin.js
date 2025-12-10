const bcrypt = require("bcrypt");
const User = require("../models/Users");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });

    // console.log({ email, password });jus
  } catch (err) {
    res.status(500).json({ error: "Nincompot" });
  }
};

module.exports = signin;
