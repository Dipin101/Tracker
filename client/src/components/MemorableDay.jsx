import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { DateTime } from "luxon";
import { fetchFromBackend } from "../api";

const MemorableDay = ({ onAdd }) => {
  const MAX_SUMMARY_LENGTH = 100;

  const [summary, setSummary] = useState("");
  const [journal, setJournal] = useState("");
  const [showJournal, setShowJournal] = useState(false);
  const [summaryAdded, setSummaryAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const [loading, setLoading] = useState(true);

  //getting the current date to see if it matches the db
  const nowToronto = DateTime.now().setZone("America/Toronto");
  const day = String(nowToronto.day).padStart(2, "0");
  const month = String(nowToronto.month).padStart(2, "0");
  const year = nowToronto.year;

  // Fetch today's summary
  useEffect(() => {
    const fetchTodaySummary = async () => {
      const user = auth.currentUser;
      if (!user) {
        // setLoading(false);
        return;
      }

      try {
        const data = await fetchFromBackend(
          `/api/users/memorable/${user.uid}/${year}/${month}/${day}`,
        );
        // console.log(data);
        if (data && data.summary) {
          setSummary(data.summary);
          setJournal(data.journal || "");
          setSummaryAdded(true); // lock everything
          setShowJournal(false); // hide journal initially
        }
      } catch (err) {
        console.error("Error fetching today's summary:", err);
      }
    };

    fetchTodaySummary();
  }, [day, month, year]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!summary) return;

    const user = auth.currentUser;
    if (!user) return;

    try {
      const data = await fetchFromBackend("/api/users/memorable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          day,
          month,
          year,
          summary,
          journal,
        }),
      });

      setSuccessMessage(data.message || "Summary added successfully!");
      setErrorMessage("");
      setSummaryAdded(true);
      setShowJournal(false);

      onAdd && onAdd({ day, month, year, summary, journal });
    } catch (err) {
      console.error("Error adding memorable day:", err);
      setErrorMessage("Server error. Please try again.");
    }
  };

  // If loading, don't render the form yet
  // if (loading) {
  //   return <p className="text-black">Loading today's summary...</p>;
  // }

  return (
    <div className="flex flex-col gap-4 text-black">
      <div className="p-4 bg-green-300 rounded shadow flex flex-col gap-2">
        <h2 className="text-xl font-bold">Memorable Day</h2>
        <p>Today is {nowToronto.toFormat("d LLLL yyyy")}</p>
        <p>Write highlights or memorable moments of your day.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className="flex flex-col gap-1">
            Summary (max {MAX_SUMMARY_LENGTH} chars,{" "}
            {MAX_SUMMARY_LENGTH - summary.length} left):
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={MAX_SUMMARY_LENGTH}
              readOnly={summaryAdded}
              // disabled={summaryAdded}
              placeholder={
                summaryAdded
                  ? "Summary already added for today"
                  : "Write a short summary of the day..."
              }
              className="border rounded px-2 py-1 w-full"
              rows={1}
            />
          </label>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm">
              {successMessage}{" "}
              {summaryAdded && "You can edit later from your dashboard."}
            </p>
          )}

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showJournal}
              onChange={() => setShowJournal(!showJournal)}
              disabled={summaryAdded}
              className="w-4 h-4"
            />
            Add Journal / Comment
          </label>

          {showJournal && (
            <textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder={
                summaryAdded
                  ? "Journal locked for today"
                  : "Detailed journal / comment (optional)"
              }
              disabled={summaryAdded}
              className="border rounded px-2 py-1 w-full overflow-y-auto resize-none
                         max-h-40 md:max-h-50 lg:max-h-80"
            />
          )}

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-32"
            disabled={summaryAdded}
          >
            {summaryAdded ? "Summary Added" : "Add Day"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemorableDay;
