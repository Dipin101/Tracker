const express = require("express");
const register = require("../controller/register");
const signin = require("../controller/signin");
const googleAuth = require("../controller/googleAuth");
const getUser = require("../controller/getUser");
const getProfile = require("../controller/getProfile");

const router = express.Router();

router.post("/register", register);
router.post("/signin", signin);
router.post("/googleauth", googleAuth);

// Get user by firebaseUid
router.post("/getUser", getUser);
//Get user data from mongo through firebaseUID
router.post("/getProfile", getProfile);

module.exports = router;
