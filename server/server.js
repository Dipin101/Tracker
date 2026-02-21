// server.js
const dotenv = require("dotenv");
dotenv.config(); // <-- must be first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./controller/database/db");
const userRoutes = require("./routes/users");
// const session = require("express-session");
// const authRoutes = require("./routes/auth"); // Google auth routes

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(
  cors({
    origin: [
      "https://habit-tracker-three-ivory.vercel.app", //for render
      "http://localhost:5173", //for local
    ],
    credentials: true, // allow cookies
  }),
);
app.use(express.json());

// connect to MongoDB
connectDB();

// your existing routes
app.use("/api/users", userRoutes);

// start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
