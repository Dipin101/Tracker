const Habits = require("../../models/Habits");

const createMemorable = async (req, res) => {
  try {
    //get the user's data
    const { userId, year, month, day, summary, journal } = req.body;

    //validate
    if (!userId || !year || !month || !day || !summary) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the user's habit document
    const userHabits = await Habits.findOne({ userId });
    if (!userHabits) return res.status(404).json({ message: "User not found" });

    // console.log(userHabits);
    // console.log(year, month, day, summary);
    // Find the correct month
    const monthData = userHabits.months.find(
      (m) =>
        Number(m.year) === Number(year) && String(m.month) === String(month),
    );

    // console.log(monthData);
    if (!monthData) {
      return res.status(404).json({ message: "Month not found for this user" });
    }

    //check if summary exists or not
    const existingDay = monthData.memorable.find(
      (d) => Number(d.day) === Number(day),
    );
    if (existingDay) {
      return res
        .status(400)
        .json({ message: "Summary for this day already exists" });
    }

    // Add new memorable day
    monthData.memorable.push({ day, month, year, summary, journal });

    // Save parent document
    await userHabits.save();

    res.status(201).json({ message: "Memorable day added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = createMemorable;
