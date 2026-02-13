import React from "react";

const SleepCycle = () => {
  return (
    <div className="p-4 bg-green-300 rounded shadow flex flex-col gap-2 ">
      <h2 className="text-xl font-bold">Sleep Cycle</h2>
      <p>Log your sleep schedule and patterns.</p>
      <ul className="list-disc pl-5">
        <li>Sleep start: 10:30 PM</li>
        <li>Sleep end: 6:30 AM</li>
        <li>Total sleep: 8 hours</li>
      </ul>
    </div>
  );
};

export default SleepCycle;
