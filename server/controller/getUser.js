const User = require("../models/Users");

const getUser = async (req, res) => {
  const { firebaseUid } = req.body;

  try {
    // console.log("firebase", firebaseUid);
    const user = await User.findOne({ firebaseUid });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ name: user.firstName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = getUser;
