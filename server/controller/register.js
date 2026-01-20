const User = require("../models/Users");

const register = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    const { firstName, lastName, email, phone, firebaseUid } = req.body;

    //checking if the user already exists in MongoDB
    const existingUser = await User.findOne({ firebaseUid });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    //store in MongoDb
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      firebaseUid,
    });

    console.log("saving user to mongoDB", newUser);
    await newUser.save(); // saves user in MongoDB

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log("This is from register", err);
    res.status(500).json({ error: "Server error hehee", details: err.message });
  }
};

module.exports = register;
