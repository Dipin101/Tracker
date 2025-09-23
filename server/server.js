const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const port = 3000;

dotenv.config();
app.use(cors());
app.use(express.json());

app.post("/api/test", (req, res) => {
  console.log("Received from frontend:", req.body);
  res.json({ message: "Backend is working" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
