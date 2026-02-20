import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; // adjust path
import { DateTime } from "luxon";

const StreakCard = () => {
  const [streak, setStreak] = useState(0);
  const [userName, setUserName] = useState("User");
  const [message, setMessage] = useState("");
  const streakMessages = [
    "Keep going!",
    "Don't break it!",
    "You're on fire!",
    "Let's go!",
    "Stay consistent!",
  ];
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStreak = async () => {
      const user = auth.currentUser;
      if (!user) return;

      setUserName(user.displayName || "User"); // optional

      const today = DateTime.now().setZone("America/Toronto").toISODate();

      try {
        const res = await fetch(`${API_URL}/api/users/streak`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.uid, today }),
        });

        if (!res.ok) {
          console.error("Failed to fetch streak");
          return;
        }

        const data = await res.json();
        setStreak(data.streak);
        const msgIdx = Math.min(data.streak, streakMessages.length - 1);
        setMessage(streakMessages[msgIdx]);
      } catch (err) {
        console.error("Error fetching streak:", err);
      }
    };

    fetchStreak();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
      <h3 className="text-sm text-gray-500">Current Streak</h3>
      <p className="text-3xl font-bold text-gray-800 mt-2">
        🔥 {streak} {streak === 1 ? "day" : "days"}
      </p>
      <p className="text-sm text-gray-400 mt-1">{message}</p>
    </div>
  );
};

export default StreakCard;
