const express = require("express");
const register = require("../controller/register");
const signin = require("../controller/signin");
const googleAuth = require("../controller/googleAuth");
const getUser = require("../controller/getUser");

const router = express.Router();

router.post("/register", register);
router.post("/signin", signin);
router.post("/googleauth", googleAuth);

// Get user by firebaseUid
router.post("/getUser", getUser);

module.exports = router;
