const mongoose = require("mongoose");

const HabitDaySchema = new mongoose.Schema({
  day: Number,
  summary: { type: String, maxlength: 100, default: "" }, // For Memorable/Journal
  journal: { type: String, default: "" },
});

const HabitSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started",
  },
  comment: { type: String, default: "" },
});

const SleepDaySchema = new mongoose.Schema({
  day: Number,
  hours: { type: Number, default: 0 },
});

const MonthDataSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: String, required: true }, // "02" or "February"
  trackSleep: { type: Boolean, default: false },
  memorable: [HabitDaySchema],
  habits: [HabitSchema],
  sleep: [SleepDaySchema],
});

const HabitsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  months: [MonthDataSchema], // all months stored in this array
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Habits", HabitsSchema);
