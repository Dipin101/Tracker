import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const CompletionCard = () => {
  const [habits, setHabits] = useState([]);
  const [completion, setCompletion] = useState(0);

  // Recalculate completion whenever habits change
  useEffect(() => {
    if (!habits || habits.length === 0) {
      setCompletion(0);
      return;
    }
    const completed = habits.filter((h) => h.status === "completed").length;
    const percent = Math.round((completed / habits.length) * 100);
    setCompletion(percent);
  }, [habits]);

  // Fetch today's habits once on mount
  useEffect(() => {
    const fetchHabits = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const res = await fetch(
          "http://localhost:3000/api/users/today-completion",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.uid }),
          },
        );
        if (!res.ok) return;

        const data = await res.json();
        setHabits(data.habits || []);
        // console.log(data);
      } catch (err) {
        console.error("Error fetching today's habits:", err);
      }
    };

    fetchHabits();
  }, []); // <-- empty dependency array, only runs on mount

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center h-40">
      <h3 className="text-sm text-gray-500 mb-4">Today's Completion</h3>
      <p className="text-3xl font-bold text-gray-800">{completion}%</p>
    </div>
  );
};

export default CompletionCard;
