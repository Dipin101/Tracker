const { type } = require("firebase/firestore/pipelines");
const mongoose = require("mongoose");

const sleepSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
});

module.exports = mongoose.model("Sleep", sleepSchema);
