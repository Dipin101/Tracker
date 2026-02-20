require("dotenv").config({ path: __dirname + "/../../config/.env" }); // load .env
const admin = require("firebase-admin");

const serviceAccountPath = process.env.FIRE_BASE_CREDENTIAL;

if (!serviceAccountPath) {
  throw new Error("FIRE_BASE_CREDENTIAL is not defined! Check your .env file.");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

module.exports = admin;
