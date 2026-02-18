const Habits = require("../../models/Habits");

const postHabits = async (req, res) => {
  try {
    const { userId, month, year, habits } = req.body;

    if (!userId || !month || !year || !habits) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find if user already has data for that month
    let userHabits = await Habits.findOne({ userId });

    if (!userHabits) {
      // Create new document for user
      userHabits = new Habits({ userId, months: [] });
    }

    // Find if this month already exists
    let monthData = userHabits.months.find(
      (m) => m.month === month && String(m.year) === String(year),
    );

    if (!monthData) {
      monthData = { month, year, habits: [] };
      userHabits.months.push(monthData);
    }

    // Merge habits
    habits.forEach((incomingHabit) => {
      const existingHabit = monthData.habits.find(
        (h) => h.title === incomingHabit.title,
      );

      if (existingHabit) {
        // Update statuses and comments
        incomingHabit.status.forEach((s) => {
          const index = existingHabit.status.findIndex(
            (st) => st.date === s.date,
          );
          if (index !== -1) {
            existingHabit.status[index] = s;
          } else {
            existingHabit.status.push(s);
          }
        });

        incomingHabit.comment.forEach((c) => {
          const index = existingHabit.comment.findIndex(
            (cm) => cm.date === c.date,
          );
          if (index !== -1) {
            existingHabit.comment[index] = c;
          } else {
            existingHabit.comment.push(c);
          }
        });
      } else {
        // Add new habit
        monthData.habits.push(incomingHabit);
      }
    });

    userHabits.updatedAt = new Date();
    await userHabits.save();

    res.json({ message: "Habits saved successfully" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports = postHabits;
