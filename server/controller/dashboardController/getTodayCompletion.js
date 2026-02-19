const { DateTime } = require("luxon");
const Habits = require("../../models/Habits");

const getTodayCompletion = async (req, res) => {
  try {
    const { userId } = req.body;
    const today = DateTime.now().setZone("America/Toronto");

    const day = today.day;

    const habitsDoc = await Habits.findOne({ userId });
    if (!habitsDoc) return res.status(404).json({ message: "No habits found" });
    // console.log("khi ta chalos", habitsDoc.months);
    const habitsData = habitsDoc.habits;
    console.log("habit", habitsData);
    res.json({ habits: habitsData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch today's habits" });
  }
};

module.exports = getTodayCompletion;
