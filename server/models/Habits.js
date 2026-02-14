const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["completed", "in-progress", "non-completed"],
    default: "not-completed",
  },
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("Habits", habitSchema);
