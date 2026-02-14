const mongoose = require("mongoose");

const monthlyRecordShow = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: String, required: true },
  memorable: { type: [memorableSchema], default: [] }, // array of memorable events
  habits: { type: [habitSchema], default: [] },
  sleep: { type: [sleepSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});
