import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Tab from "../components/Tab";
import MemorableDay from "../components/MemorableDay";
import SleepCycle from "../components/SleepCycle";
import HabitsToTrack from "../components/HabitsToTrack";

const HabitTrack = () => {
  const [activeTab, setActiveTab] = useState("memorable");

  const renderContent = () => {
    switch (activeTab) {
      case "memorable":
        return <MemorableDay />;
      case "habits":
        return <HabitsToTrack />;
      case "sleep":
        return <SleepCycle />;
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] p-4 bg-amber-500 rounded-2xl overflow-auto">
      <h1 className="text-5xl mb-4 font-bold">Welcome to Habit Tracker</h1>

      {/* File Tabs */}
      <div className="flex border-b border-gray-300 mb-0">
        <Tab
          title="Memorable Day"
          isActive={activeTab === "memorable"}
          onClick={() => setActiveTab("memorable")}
        />
        <Tab
          title="Habits to Track"
          isActive={activeTab === "habits"}
          onClick={() => setActiveTab("habits")}
        />
        <Tab
          title="Sleep Cycle"
          isActive={activeTab === "sleep"}
          onClick={() => setActiveTab("sleep")}
        />
      </div>

      {/* Content container (looks like folder content) */}
      <div className="bg-white p-4 rounded-b-lg shadow border border-t-0 h-[calc(95vh-15rem)] sm:h-[calc(80vh-13rem)] md:h-[calc(85vh-15rem)]">
        {renderContent()}
      </div>

      {/* Fixed Add Button */}
      <button className="fixed bottom-10 right-10 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
        <IoAddOutline size={32} className="text-white" />
      </button>
    </div>
  );
};

export default HabitTrack;
