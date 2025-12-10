// server.js
const dotenv = require("dotenv");
dotenv.config(); // <-- must be first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./controller/db");
const userRoutes = require("./routes/users");
const session = require("express-session");
const passport = require("passport");
require("./backend/passport"); // load passport config
const authRoutes = require("./routes/auth"); // Google auth routes

const app = express();
const port = 3000;

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // allow cookies
  })
);
app.use(express.json());

// connect to MongoDB
connectDB();

// session middleware (required for passport)
app.use(
  session({
    secret: "some_secret_key", // change to a strong secret in production
    resave: false,
    saveUninitialized: true,
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// your existing routes
app.use("/api/users", userRoutes);

// Google OAuth routes
app.use("/api", authRoutes);

// start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
