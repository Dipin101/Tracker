import React, { useRef, useState, useEffect, useMemo } from "react";
import { auth } from "../firebase";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
);

const SleepCycle = ({ startDate }) => {
  const chartRef = useRef();

  //Dummy data
  // const start = 1;
  // const totalDays = 31; // full month

  //Actual data
  const start = new Date(startDate);
  const year = start.getFullYear();
  const month = start.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Labels = days of month from startDate
  const labels = useMemo(() => {
    const arr = [];
    for (let d = start.getDate(); d <= totalDays; d++) arr.push(d);
    return arr;
  }, [startDate]);

  // Initialize sleep data as null so empty points
  const [sleepData, setSleepData] = useState(Array(labels.length).fill(null));
  //dummy data to check
  // const [sleepData, setSleepData] = useState([
  //   6, // 18th → already added → cannot edit
  //   7.5, // 19th → already added → cannot edit
  //   null, // 20th → today → can add
  //   null, // 21th → future → blocked
  //   null, // 22th → future → blocked
  //   null, // 23th → future → blocked
  //   null, // 24th → future → blocked
  //   null, // 25th → future → blocked
  //   null, // 26th → future → blocked
  //   null, // 27th → future → blocked
  //   null, // 28th → future → blocked
  // ]);

  useEffect(() => {
    const fetchSleepData = async () => {
      const user = auth.currentUser;
      if (!user) {
        return;
      }

      try {
        // Assuming your backend route returns all sleep data for the month
        const res = await fetch(
          `http://localhost:3000/api/users/sleep/${user.uid}/${year}/${month + 1}`,
        );
        if (!res.ok) return;

        const data = await res.json(); // should return this bakchodi: [{ day: 18, hour: 360 }]
        //lets see
        // Convert minutes to hours
        console.log(data);
        const newSleepData = labels.map((day) => {
          const record = data.find((d) => Number(d.day) === day);
          return record ? record.hours / 60 : null;
        });

        // console.log(sleepData);
        setSleepData(newSleepData);
      } catch (err) {
        console.error("Error fetching sleep data:", err);
      }
    };

    fetchSleepData();
  }, [labels]);

  const postSleep = async (day, hours) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const sleepMinutes = Math.round(hours * 60);
      const BACKEND_URL = "http://localhost:3000/api/users/sleep";
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          year: start.getFullYear(),
          month: String(start.getMonth() + 1).padStart(2, "0"),
          day: String(day).padStart(2, "0"),
          hour: sleepMinutes,
        }),
      });
      const data = await response.json();
      console.log("Saved from frontend", data);
    } catch (err) {
      console.error("Error saving sleep:", err);
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Sleep Hours",
        data: sleepData,
        borderColor: "black",
        backgroundColor: "transparent",
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: (ctx) => {
          const value = ctx.raw;
          if (value < 7) return "red"; //--> low sleep
          if (value >= 7 && value <= 9) return "green"; //--> optimum sleep 7-9 hours
          return "blue"; //--> too much sleep --potential risk
        },
        segment: {
          borderColor: (ctx) => {
            const start = ctx.p0.parsed.y;
            if (start < 7) return "red";
            if (start >= 7 && start <= 9) return "green";
            return "blue";
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 12,
        ticks: { stepSize: 1 },
        title: { display: true, text: "Hours Slept" },
      },
      x: {
        offset: true,
        title: { display: true, text: "Days of the Month" },
      },
    },
    plugins: {
      tooltip: { enabled: true },
      //Didn't work because i only have one dataset stupid rechartjs
      // legend: {
      //   display: true,
      //   position: "bottom",
      //   labels: {
      //     usePointStyle: true,
      //     generateLabels: (chart) => [
      //       {
      //         text: "0-6.9 hours (Low Sleep)",
      //         fillStyle: "red",
      //         pointStyle: "circle",
      //       },
      //       {
      //         text: "7-9 hours (Optimum Sleep)",
      //         fillStyle: "green",
      //         pointStyle: "circle",
      //       },
      //       {
      //         text: "9+ hours (Too Much Sleep)",
      //         fillStyle: "blue",
      //         pointStyle: "circle",
      //       },
      //     ],
      //   },
      // },
    },
  };

  // Click anywhere in the chart area to set Y-value
  const handleClick = (event) => {
    const chart = chartRef.current;
    if (!chart) return;

    const canvas = chart.canvas;
    const rect = canvas.getBoundingClientRect();

    // Calculate relative mouse position inside chart
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xScale = chart.scales.x;
    const yScale = chart.scales.y;

    if (!xScale || !yScale) return;

    // Snap X to nearest day index
    let dayIndex = Math.round(xScale.getValueForPixel(x));
    dayIndex = Math.max(0, Math.min(dayIndex, labels.length - 1));

    //check the day to track sleep
    const clickedDay = labels[dayIndex];

    const nowToronto = DateTime.now().setZone("America/Toronto");
    const today = nowToronto.day;

    //simulating date
    // const today = 20;
    //block future days
    if (clickedDay > today) {
      alert("You can only edit sleep for today!");
      return;
    }
    // block past days
    if (clickedDay < today && sleepData[dayIndex] !== null) {
      alert("Sleep data for past days are locked and cannot be edited.");
      return;
    }

    // Y = hours slept
    let hours = parseFloat(yScale.getValueForPixel(y).toFixed(1));
    hours = Math.min(Math.max(hours, 0), 12);
    // console.log(hours);

    // Update sleep data
    const newData = [...sleepData];
    newData[dayIndex] = hours; // round 1 decimal
    setSleepData(newData);
    postSleep(clickedDay, hours);
  };

  return (
    <div className="w-full" style={{ height: "60vh", minHeight: "400px" }}>
      <Line
        ref={chartRef}
        data={data}
        options={options}
        onClick={handleClick}
      />
      <div className="flex gap-4 mt-2 text-black text-sm font-medium">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-red-500 inline-block "></span>
          <span>0-7 hours (Low Sleep)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-green-500 inline-block "></span>
          <span>7-9 hours (Optimum Sleep)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-blue-500 inline-block "></span>
          <span>9+ hours (Too Much Sleep)</span>
        </div>
      </div>
    </div>
  );
};

export default SleepCycle;
