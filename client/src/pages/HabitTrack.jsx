import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Tab from "../components/Tab";
import MemorableDay from "../components/MemorableDay";
import SleepCycle from "../components/SleepCycle";
import HabitsToTrack from "../components/HabitsToTrack";

const HabitTrack = () => {
  const [activeTab, setActiveTab] = useState("memorable");
  //for modal
  const [isOpen, setIsOpen] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const [month, setMonth] = useState(currentMonth);

  const isOpenModal = () => setIsOpen(true);

  const handleAdd = (e) => {
    e.preventDefault();
    console.log({ currentYear, month });
    setIsOpen(false);
  };

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
      <button
        className="fixed bottom-10 right-10 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg"
        onClick={isOpenModal}
      >
        <IoAddOutline size={32} className="text-white" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center text-black z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>

            <h2 className="text-xl font-bold mb-4">Add Month</h2>

            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <label>
                Year:
                <input
                  type="number"
                  value={currentYear}
                  min={currentYear}
                  className="border rounded px-2 py-1 w-full"
                  readOnly
                />
              </label>

              <label>
                Month:
                <input
                  type="month"
                  value={`${currentYear}-${month}`} // current year + selected month
                  onChange={(e) => setMonth(e.target.value.split("-")[1])} // get only month
                  min={`${currentYear}-${currentMonth}`} // disable past months
                  max={`${currentYear}-12`} // disable next year months
                  className="border rounded px-2 py-1 w-full"
                  required
                />
              </label>

              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitTrack;
