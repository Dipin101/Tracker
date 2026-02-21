import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import QuoteCard from "../../components/QuoteCard";
import StreakCard from "../../components/StreakCard";
import CompletionCard from "../../components/CompletionCard";
import SleepCompletion from "../../components/SleepCompletion";
import { fetchFromBackend } from "../../api";

const Dashboard = () => {
  const [userName, setUserName] = useState(null);
  // const [sleepAvg, setSleepAvg] = useState(6.8); // dummy hours
  // const [streak, setStreak] = useState(12); // dummy days
  // const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const idToken = await user.getIdToken();

      const res = await fetchFromBackend("/api/users/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      setUserName(res.name);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-screen overflow-auto bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Welcome Header */}
        <div className="mb-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {userName || "User"} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Track your progress and stay consistent.
          </p>
        </div>

        {/* Quote Card */}
        <QuoteCard className />

        {/* Top Stats: Streak, Completion, Sleep */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Streak card component */}
          <StreakCard />

          {/* Completion Component */}
          <CompletionCard />

          {/* Sleep completion */}
          <SleepCompletion />
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <h3 className="text-sm text-gray-500">Monthly Overview</h3>
            <p className="text-xl font-semibold text-gray-800 mt-2">
              Goals: 12
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Habit completion rate: 75%
            </p>
          </div>
        </div>

        {/* Detailed Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Overview */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Monthly Overview
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>Habit completion rate: 75%</li>
              <li>Average sleep: 6.8 hrs</li>
              <li>Monthly goals completed: 12/15</li>
            </ul>
          </div>

          {/* Weekly Overview */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Weekly Overview
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>Week 1: 70% completion</li>
              <li>Week 2: 80% completion</li>
              <li>Week 3: 75% completion</li>
              <li>Week 4: 78% completion</li>
            </ul>
          </div>

          {/* Daily Details */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Daily Progress
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>Today: 80% habits done</li>
              <li>Sleep: 7 hrs</li>
              <li>Hydration: 6 glasses</li>
            </ul>
          </div>
        </div>

        {/* Dive deeper CTA */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Dive Deeper Into Your Progress
            </h3>
            <p className="text-gray-500 mt-1">
              View detailed charts, trends, and reports for better insights.
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
            Explore Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
