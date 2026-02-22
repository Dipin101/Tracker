import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { DateTime } from "luxon";
import { fetchFromBackend } from "../api";

const MonthlySleepCompletion = () => {
  const [completionPercent, setCompletionPercent] = useState(0);
  const [averageHours, setAverageHours] = useState(0);

  useEffect(() => {
    const fetchSleepData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const nowToronto = DateTime.now().setZone("America/Toronto");
      const currentYear = nowToronto.year;
      const currentMonth = String(nowToronto.month).padStart(2, "0");

      // console.log(currentYear, currentMonth);

      try {
        // /avgsleep/:userId/:year/:month
        const data = await fetchFromBackend(
          `/api/users/avgsleep/${user.uid}/${currentYear}/${currentMonth}`,
        );
        const monthData = data.month;

        if (!monthData?.sleep || monthData.sleep.length === 0) {
          setCompletionPercent(0);
          setAverageHours(0);
          return;
        }

        // Sleep is stored in minutes, convert to hours
        const totalMinutes = monthData.sleep.reduce(
          (sum, day) => sum + (day.hours || 0),
          0,
        );
        const daysTracked = monthData.sleep.length;
        const avgHours = totalMinutes / 60 / daysTracked; // convert to hours
        const percent = Math.min(Math.round((avgHours / 8) * 100), 100);

        setAverageHours(avgHours.toFixed(1));
        setCompletionPercent(percent);
      } catch (err) {
        console.error("Error fetching sleep data:", err);
        setCompletionPercent(0);
        setAverageHours(0);
      }
    };

    fetchSleepData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center">
      <h3 className="text-sm text-gray-500 mb-2">Avg Sleep (Month)</h3>
      <p className="text-3xl font-bold text-gray-800">{averageHours} hrs</p>
      <p className="text-sm text-gray-400 mb-2">
        Completion: {completionPercent}%
      </p>
      <p className="text-sm text-gray-400">Aim for 7–8 hrs daily</p>
    </div>
  );
};

export default MonthlySleepCompletion;
