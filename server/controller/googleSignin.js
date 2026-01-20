// const admin = require("firebase-admin");
// const User = require("../models/Users");

// const googleSignin = async (req, res) => {
//   try {
//     const { idToken } = req.body;

//     if (!idToken) {
//       return res.status(400).json({ error: "Token required" });
//     }

//     // 1️⃣ Verify token with Firebase
//     const decodedToken = await admin.auth().verifyIdToken(idToken);

//     const { uid, email, name } = decodedToken;

//     // 2️⃣ Check Mongo
//     let user = await User.findOne({ firebaseUid: uid });

//     // 3️⃣ Create if not exists
//     if (!user) {
//       user = await User.create({
//         firebaseUid: uid,
//         email,
//         name,
//         avatar: picture,
//         provider: "google",
//       });
//     }

//     // 4️⃣ Respond
//     res.status(200).json({
//       message: "Google login successful",
//       userId: user._id,
//     });
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// module.exports = googleSignin;
