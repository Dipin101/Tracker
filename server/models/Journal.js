const mongoose = require("mongoose");

const Journal = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  date: { type: Date, default: Date.now },
});
