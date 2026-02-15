const Habits = require("../../models/Habits");

const getMonths = async (req, res) => {
  try {
    const { userId, year, month, trackSleepModal } = req.body;

    if (!userId || !year || !month) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    //  Find user document
    let userHabits = await Habits.findOne({ userId });

    // If it doesn't exist, create new document
    if (!userHabits) {
      userHabits = new Habits({ userId, months: [] });
    }

    // Check if month already exists
    const monthExists = userHabits.months.some(
      (m) => m.year === year && m.month === month,
    );

    if (monthExists) {
      return res.status(400).json({ message: "Month already exists" });
    }

    // Add new month
    userHabits.months.push({
      year,
      month,
      memorable: [],
      habits: [],
      sleep: [],
      trackSleep: trackSleepModal,
    });

    //  Save document
    await userHabits.save();

    // Send the new month to frontend
    const addedMonth = userHabits.months.find(
      (m) => m.year === year && m.month === month,
    );

    res.status(201).json({ month: addedMonth });
  } catch (err) {
    res.status(500).json({ error: "Abe laude Server error" });
  }
};

module.exports = getMonths;
