const Habits = require("../../models/Habits");

const getMonth = async (req, res) => {
  // console.log("Get month hit");
  try {
    const { userId, year, month } = req.params;

    // console.log(userId, year, month);
    // Validate params
    if (!userId || !year || !month) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
    // Find user document
    const userHabits = await Habits.findOne({ userId });
    if (!userHabits) {
      return res.status(404).json({ message: "User habits not found" });
    }

    //  Find the specific month
    const foundMonth = userHabits.months.find(
      (m) => String(m.year) === year && m.month === month,
    );
    // console.log(foundMonth);
    if (!foundMonth) {
      return res.status(404).json({ message: "Month not found" });
    }
    // Return month data
    res.status(200).json({ month: foundMonth });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getMonth;
