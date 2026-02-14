const User = require("../../models/Users");
const admin = require("../firebase/firebaseAdmin");

const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      //200 --> success 201--> something was created
      //400--> bad request 401--> unauthorized 403 --> forbidden
      //500  --> internal server error
      return res.status(400).json({ error: "ID token is required" });
    }
    // verify token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid: firebaseUid, email, name, phone } = decodedToken;

    // split name into first/last
    const [firstName, ...lastNameArr] = (name || "").split(" ");
    const lastName = lastNameArr.join(" ") || "Unknown";

    // check if user exists
    let user = await User.findOne({ firebaseUid });

    if (!user) {
      // user doesn’t exist → create new
      user = new User({
        firstName,
        lastName,
        email,
        phone: phone || null,
        firebaseUid,
      });

      await user.save();
      console.log("New user registered via Google:", user);
    } else {
      console.log("Existing user signed in via Google:", user);
    }

    // return user data (same for sign-up or sign-in)
    res.status(200).json({ user });
  } catch (err) {
    console.error("Google Auth error: ", err);
    res.status(500).json({ error: "Google Auth failed", details: err.message });
  }
};

module.exports = googleAuth;
