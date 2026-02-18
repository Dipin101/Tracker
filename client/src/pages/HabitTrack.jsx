import React, { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import Tab from "../components/Tab";
import MemorableDay from "../components/MemorableDay";
import SleepCycle from "../components/SleepCycle";
import HabitsToTrack from "../components/HabitsToTrack";
import { auth } from "../firebase";

const HabitTrack = () => {
  const [activeTab, setActiveTab] = useState(() => {
    // read last active tab from localStorage
    const savedTab = localStorage.getItem("activeTab");
    return savedTab || "memorable";
  });
  const [currentMonthData, setCurrentMonthData] = useState(null);
  const [trackSleepModal, setTrackSleepModal] = useState(false);
  //for modal
  const [isOpen, setIsOpen] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const estNowStr = new Date().toLocaleString("en-US", {
    timeZone: "America/Toronto",
  });

  // //simulating to see next month
  // const now = new Date();
  // now.setMonth(now.getMonth() + 1); // simulate next month
  // const currentYear = now.getFullYear();
  // const currentMonth = String(now.getMonth() + 1).padStart(2, "0");

  const isOpenModal = () => setIsOpen(true);

  //for state to be active
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const fetchMonth = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const res = await fetch(
          `http://localhost:3000/api/users/months/${user.uid}/${currentYear}/${currentMonth}`,
        );

        if (!res.ok) {
          setCurrentMonthData(null);
          return;
        }
        const data = await res.json();
        setCurrentMonthData(data.month);
      } catch (err) {
        console.log("Error fetching month: ", err);
        setCurrentMonthData(null);
      }
    };
    fetchMonth();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return console.log("No user logged in");
    // console.log(user.uid, currentYear, currentMonth, trackSleepModal);
    const backendUrl = "http://localhost:3000/api/users/months";

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid, //--> firebase uid
          year: currentYear,
          month: currentMonth,
          trackSleepModal: trackSleepModal,
          sleepTrackingStart: new Date(estNowStr),
        }),
      });

      if (!res.ok) {
        try {
          const errorData = await res.json();
          console.error("Error adding month:", errorData.message || errorData);
        } catch {
          console.error("Error adding month: ", res.statusText);
        }
        return;
      }

      const data = await res.json();
      // console.log("Month added:", data);

      // Update frontend state so tabs show immediately
      setCurrentMonthData(data.month);

      setIsOpen(false);
    } catch (err) {
      console.log("Error");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "memorable":
        return <MemorableDay />;
      case "habits":
        return <HabitsToTrack />;
      case "sleep":
        return (
          <SleepCycle
            startDate={
              currentMonthData?.sleepTrackingStart || new Date(estNowStr)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] p-4 bg-amber-500 rounded-2xl overflow-auto">
      <h1 className="text-5xl mb-4 font-bold">Welcome to Habit Tracker</h1>

      {/* // loading ? (
        //   <div className="flex items-center justify-center h-full">
        //     Loading...
        //   </div>
        // ) : */}

      {/*small header */}
      {currentMonthData ? (
        <p className="text-gray-800 mb-4">
          Tracking for{" "}
          {new Date(
            currentMonthData.year,
            currentMonthData.month - 1,
          ).toLocaleString("default", { month: "long", year: "numeric" })}
        </p>
      ) : (
        <p className="text-gray-600 mb-4">
          You haven't started tracking this month yet.
        </p>
      )}

      {currentMonthData ? (
        <>
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
            {currentMonthData.trackSleep && (
              <Tab
                title="Sleep Cycle"
                isActive={activeTab === "sleep"}
                onClick={() => setActiveTab("sleep")}
              />
            )}
          </div>

          {/* Content container (looks like folder content) */}
          <div className="bg-white p-4 rounded-b-lg shadow border border-t-0 h-[calc(95vh-15rem)] sm:h-[calc(80vh-13rem)] md:h-[calc(85vh-15rem)]">
            {renderContent()}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-xl text-gray-700">
          No data for this month. Click Add + to start tracking.
        </div>
      )}
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
                  type="text"
                  value={`${now.toLocaleString("default", { month: "long" })} ${currentYear}`}
                  className="border rounded px-2 py-1 w-full bg-gray-100"
                  readOnly
                />
              </label>

              {/* sleep tracking */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={trackSleepModal}
                  onChange={(e) => setTrackSleepModal(e.target.checked)}
                  className="w-4 h-4"
                />
                Track Your Sleep
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
