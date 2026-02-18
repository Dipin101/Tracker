const express = require("express");
const register = require("../controller/authController/register");
const signin = require("../controller/authController/signin");
const googleAuth = require("../controller/authController/googleAuth");
const getUser = require("../controller/getUser");
const getProfile = require("../controller/profileController/getProfile");
const postMonths = require("../controller/habitsController/postMonths");
const getMonth = require("../controller/habitsController/getMonth");
const createMemorable = require("../controller/habitsController/createMemorable");
const getMemorable = require("../controller/habitsController/getMemorable");
const postHabits = require("../controller/habitsController/postHabits");
const getHabits = require("../controller/habitsController/getHabits");

const router = express.Router();

router.post("/register", register);
router.post("/signin", signin);
router.post("/googleauth", googleAuth);

// Get user by firebaseUid
router.post("/getUser", getUser);
//Get user data from mongo through firebaseUID
router.post("/getProfile", getProfile);

//For habits
router.post("/months", postMonths);
router.get("/months/:userId/:year/:month", getMonth);
router.post("/memorable", createMemorable);
router.get("/memorable/:userId/:year/:month/:day", getMemorable);
router.post("/habits", postHabits);
router.get("/habits/:userId", getHabits);

module.exports = router;
