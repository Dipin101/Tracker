const express = require("express");
const passport = require("passport");
const router = express.Router();

// Step 1: Redirect user to Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Handle callback from Google
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful login → redirect to frontend dashboard
    res.redirect("http://localhost:3000/dashboard");
  }
);

module.exports = router;
