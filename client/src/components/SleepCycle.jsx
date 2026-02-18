import React, { useRef, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
  const labels = [];
  for (let d = start.getDate(); d <= totalDays; d++) labels.push(d);

  // Initialize sleep data as null so empty points
  const [sleepData, setSleepData] = useState(Array(labels.length).fill(null));

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
      // legend: {
      //   display: true,
      //   position: "top",
      //   labels: {
      //     usePointStyle: true,
      //     generateLabels: () => [
      //       { text: "0-6.9 hours", fillStyle: "red", pointStyle: "circle" },
      //       { text: "7-9 hours", fillStyle: "green", pointStyle: "circle" },
      //       { text: "9+ hours", fillStyle: "blue", pointStyle: "circle" },
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

    // Get chart scales
    const xScale = chart.scales.x;
    const yScale = chart.scales.y;

    if (!xScale || !yScale) return;

    // Snap X to nearest day index
    let dayIndex = Math.round(xScale.getValueForPixel(x));
    if (dayIndex < 0) dayIndex = 0;
    if (dayIndex >= labels.length) dayIndex = labels.length - 1;

    //check the day to track sleep
    const clickedDay = labels[dayIndex];

    const today = new Date().getDate();

    if (clickedDay > today) {
      alert("You can only edit sleep for today or past days!");
      return;
    }

    // Y = hours slept
    let hours = parseFloat(yScale.getValueForPixel(y).toFixed(1));
    if (hours < 0) hours = 0;
    if (hours > 12) hours = 12;
    console.log(hours);

    // Update sleep data
    const newData = [...sleepData];
    newData[dayIndex] = parseFloat(hours.toFixed(1)); // round 1 decimal
    setSleepData(newData);
  };

  return (
    <div className="w-full" style={{ height: "60vh", minHeight: "400px" }}>
      <Line
        ref={chartRef}
        data={data}
        options={options}
        onClick={handleClick}
      />
    </div>
  );
};

export default SleepCycle;
