import React from "react";

const HabitsToTrack = () => {
  return (
    <div className="p-4 bg-green-300 rounded shadow flex flex-col gap-2 ">
      <h2 className="text-xl font-bold">Habits to Track</h2>
      <p>Track your daily habits here.</p>
      <ul className="list-disc pl-5">
        <li>Drink water</li>
        <li>Exercise 30 minutes</li>
        <li>Meditate</li>
      </ul>
    </div>
  );
};

export default HabitsToTrack;
