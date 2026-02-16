import React, { useState } from "react";

const MAX_HABITS = 10;

const HabitsToTrack = () => {
  const [savedHabits, setSavedHabits] = useState([]); // saved habits
  const [habitStatuses, setHabitStatuses] = useState({}); // track status
  const [habitComments, setHabitComments] = useState({}); // track comments
  const [showModal, setShowModal] = useState(false); // add habits modal
  const [modalInputs, setModalInputs] = useState([]); // new habits in modal

  const [showCommentModal, setShowCommentModal] = useState(false); // comment popup
  const [currentCommentIndex, setCurrentCommentIndex] = useState(null);
  const [currentCommentText, setCurrentCommentText] = useState("");

  // Open add habits modal
  const openModal = () => {
    const remaining = MAX_HABITS - savedHabits.length;
    if (remaining <= 0) return;
    setModalInputs([""]);
    setShowModal(true);
  };

  // Close add habits modal
  const closeModal = () => setShowModal(false);

  // Add input field in modal
  const addHabitInput = () => {
    if (modalInputs.length + savedHabits.length < MAX_HABITS) {
      setModalInputs([...modalInputs, ""]);
    }
  };

  // Update modal input
  const updateModalInput = (index, value) => {
    const updated = [...modalInputs];
    updated[index] = value;
    setModalInputs(updated);
  };

  // Remove modal input
  const removeModalInput = (index) => {
    const updated = modalInputs.filter((_, i) => i !== index);
    setModalInputs(updated);
  };

  // Save habits from modal
  const handleSave = () => {
    const cleaned = modalInputs
      .map((h) => h.trim())
      .filter((h) => h !== "" && !savedHabits.includes(h));

    if (cleaned.length === 0) {
      alert("No new valid habits to add (duplicates removed).");
      return;
    }

    const newSaved = [...savedHabits, ...cleaned];
    setSavedHabits(newSaved);

    // Initialize status and comments
    const statuses = { ...habitStatuses };
    const comments = { ...habitComments };
    cleaned.forEach((_, i) => {
      const idx = savedHabits.length + i;
      statuses[idx] = "inprogress";
      comments[idx] = "";
    });
    setHabitStatuses(statuses);
    setHabitComments(comments);

    setShowModal(false);
  };

  // Toggle habit status
  const toggleStatus = (index, status) => {
    setHabitStatuses((prev) => ({ ...prev, [index]: status }));
  };

  // Open comment popup modal
  const openCommentModal = (index) => {
    setCurrentCommentIndex(index);
    setCurrentCommentText(habitComments[index] || "");
    setShowCommentModal(true);
  };

  // Save comment
  const saveComment = () => {
    if (currentCommentIndex !== null) {
      setHabitComments((prev) => ({
        ...prev,
        [currentCommentIndex]: currentCommentText,
      }));
    }
    setShowCommentModal(false);
    setCurrentCommentIndex(null);
    setCurrentCommentText("");
  };

  const remainingHabits = MAX_HABITS - savedHabits.length;

  return (
    <div className="p-4 bg-green-300 rounded shadow flex flex-col gap-4 text-black h-[calc(60vh-8rem)]">
      <h2 className="text-xl font-bold">Habits to Track</h2>
      <p>Track your daily habits here.</p>

      {/* Add Habits Button */}
      <button
        onClick={openModal}
        className={`bg-green-600 text-white px-4 py-2 rounded w-40 ${
          remainingHabits <= 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={remainingHabits <= 0}
      >
        Add Habits
      </button>

      {/* Remaining habits info */}
      {remainingHabits > 0 && (
        <p>
          You can add {remainingHabits} more habit{remainingHabits > 1 && "s"}{" "}
          this month.
        </p>
      )}

      {/* Display Saved Habits */}
      {savedHabits.length > 0 && (
        <div className="mt-4 bg-white rounded p-4 shadow flex flex-col gap-2 overflow-auto max-h-[60vh]">
          <h3 className="font-semibold">Your Habits This Month</h3>
          <ul className="flex flex-col gap-2">
            {savedHabits.map((habit, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-2 border-b py-1"
              >
                <span>{habit}</span>

                <div className="flex items-center gap-2">
                  {/* Status buttons */}
                  <button
                    onClick={() => toggleStatus(index, "completed")}
                    className={`px-2 py-1 rounded ${
                      habitStatuses[index] === "completed"
                        ? "bg-green-500 text-white"
                        : "border"
                    }`}
                  >
                    ✅
                  </button>
                  <button
                    onClick={() => toggleStatus(index, "notdone")}
                    className={`px-2 py-1 rounded ${
                      habitStatuses[index] === "notdone"
                        ? "bg-red-500 text-white"
                        : "border"
                    }`}
                  >
                    ❌
                  </button>
                  <button
                    onClick={() => toggleStatus(index, "inprogress")}
                    className={`px-2 py-1 rounded ${
                      habitStatuses[index] === "inprogress"
                        ? "bg-yellow-300 text-black"
                        : "border"
                    }`}
                  >
                    ⏳
                  </button>

                  {/* Comment Icon */}
                  <button
                    onClick={() => openCommentModal(index)}
                    className="px-2 py-1 border rounded text-blue-600"
                  >
                    💬
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal for adding new habits */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-4 shadow-lg">
            <h3 className="text-lg font-semibold">Add Your Habits</h3>
            <h4 className="text-sm text-red-600">
              Once added, habits cannot be edited for the month.
            </h4>

            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {modalInputs.map((habit, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={habit}
                    onChange={(e) => updateModalInput(index, e.target.value)}
                    placeholder={`Habit ${savedHabits.length + index + 1}`}
                    className="border rounded px-2 py-1 w-full"
                  />
                  <button
                    onClick={() => removeModalInput(index)}
                    className="text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add another input */}
            {savedHabits.length + modalInputs.length < MAX_HABITS && (
              <button
                onClick={addHabitInput}
                className="text-green-600 font-medium"
              >
                Add Another
              </button>
            )}

            <div className="flex justify-end gap-2 mt-2">
              <button onClick={closeModal} className="px-3 py-1 rounded border">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Save Habits
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white p-6 rounded-xl w-80 flex flex-col gap-4 shadow-lg">
            <h3 className="text-lg font-semibold">Add Comment</h3>
            <textarea
              rows={4}
              value={currentCommentText}
              onChange={(e) => setCurrentCommentText(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Write your comment..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCommentModal(false)}
                className="px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={saveComment}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitsToTrack;
