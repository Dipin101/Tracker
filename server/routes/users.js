const express = require("express");
const register = require("../controller/register");
const signin = require("../controller/signin");
const router = express.Router();

router.post("/register", register);
router.post("/signin", signin);

module.exports = router;
