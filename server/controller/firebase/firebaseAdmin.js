require("dotenv").config({ path: __dirname + "/../../config/.env" }); // load .env
const admin = require("firebase-admin");

const serviceAccountPath = JSON.parse(process.env.FIRE_BASE_CREDENTIAL);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

module.exports = admin;
