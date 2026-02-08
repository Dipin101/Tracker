import React from "react";
import { IoAddOutline } from "react-icons/io5";
const HabitTrack = () => {
  return (
    <div className="text-black">
      <h1 className="text-5xl mb-3">Welcome to Habit Tracker</h1>
      <button
        className="
            fixed bottom-10 right-10
            w-14 h-14
          bg-green-600 rounded-full
            flex items-center justify-center
            shadow-lg
            "
      >
        <IoAddOutline size={32} className="text-white" />
      </button>
    </div>
  );
};

export default HabitTrack;
