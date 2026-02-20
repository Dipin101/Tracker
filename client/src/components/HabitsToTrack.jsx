import React, { useRef, useState, useEffect } from "react";
import { FaCheck, FaComment, FaHourglassHalf, FaTimes } from "react-icons/fa";
import { auth } from "../firebase";
import { DateTime } from "luxon";

const MAX_HABITS = 10;

const HabitsToTrack = () => {
  // State
  const [savedHabits, setSavedHabits] = useState([]);
  const [habitStatuses, setHabitStatuses] = useState({});
  const [habitComments, setHabitComments] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalInputs, setModalInputs] = useState([]);
  const [modalError, setModalError] = useState({});
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(null);
  const [currentCommentText, setCurrentCommentText] = useState("");

  // Refs
  const inputRefs = useRef([]);
  const commentRefs = useRef(null);

  //url
  const API_URL = import.meta.env.VITE_API_URL;

  // Date
  // const today = new Date().toISOString().split("T")[0]; //--> Standard gmt time
  //simulated
  // const simulatedDate = new Date();
  // simulatedDate.setDate(simulatedDate.getDate() + 1); // add 1 day
  // const today = simulatedDate.toISOString().split("T")[0];
  // YYYY-MM-DD -->EDT time
  const nowToronto = DateTime.now().setZone("America/Toronto"); // current Toronto time
  const today = nowToronto.toFormat("yyyy-MM-dd"); // for keys and payloads
  const currentMonth = String(nowToronto.month).padStart(2, "0"); // 1–12
  const displayMonth = nowToronto.toFormat("LLLL yyyy");

  // Status constants
  const STATUS = {
    COMPLETED: "completed",
    NOT_DONE: "not completed",
    IN_PROGRESS: "in progress",
  };

  // Open add habits modal
  const openModal = () => {
    if (savedHabits.length >= MAX_HABITS) return;
    setModalInputs([""]);
    setShowModal(true);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchHabits(user);
      }
    });
    return () => unsubscribe();
  }, []);

  // Focus first input on modal open
  useEffect(() => {
    if (showModal && modalInputs.length > 0) {
      const lastIndex = modalInputs.length - 1;
      inputRefs.current[lastIndex]?.focus();
    }
  }, [showModal, modalInputs.length]);

  // Add new habit input in modal
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
    validateModalInputs(updated);
  };

  // Validate modal inputs
  const validateModalInputs = (inputs) => {
    const errors = {};
    inputs.forEach((habit, index) => {
      const trimmed = habit.trim();
      if (!trimmed) return;

      if (savedHabits.includes(trimmed)) {
        errors[index] = "This habit already exists.";
        return;
      }

      const duplicateIndex = inputs.findIndex(
        (h, i) => h.trim() === trimmed && i !== index,
      );
      if (duplicateIndex !== -1) {
        errors[index] = "Duplicate habit in list.";
      }
    });
    setModalError(errors);
  };

  // Remove modal input
  const removeModalInput = (index) => {
    const updated = modalInputs.filter((_, i) => i !== index);
    setModalInputs(updated);
    validateModalInputs(updated);
  };

  // Save habits from modal
  const handleSave = () => {
    const cleaned = modalInputs
      .map((h) => h.trim())
      .filter(
        (h, i, arr) =>
          h !== "" && !savedHabits.includes(h) && arr.indexOf(h) === i,
      );

    if (cleaned.length === 0) {
      alert("No new valid habits to add.");
      return;
    }

    const newSaved = [...savedHabits, ...cleaned];
    setSavedHabits(newSaved);

    const statuses = { ...habitStatuses };
    const comments = { ...habitComments };

    cleaned.forEach((_, i) => {
      const idx = savedHabits.length + i;
      statuses[idx] = { [today]: STATUS.IN_PROGRESS };
      comments[idx] = { [today]: { text: "", date: today } };
    });

    setHabitStatuses(statuses);
    setHabitComments(comments);
    setShowModal(false);

    //send new habits to backend
    handleSubmitHabits(newSaved, statuses, comments);
  };

  // Toggle habit status
  const toggleStatus = (index, status) => {
    setHabitStatuses((prev) => {
      const updated = { ...prev };

      // If today already exists, override
      if (updated[index]) {
        updated[index][today] = status;
      } else {
        updated[index] = { [today]: status };
      }

      // send immediately to backend
      handleSubmitHabits(savedHabits, updated, habitComments);

      return updated;
    });
  };

  // Open comment modal
  const openCommentModal = (index) => {
    setCurrentCommentIndex(index);
    setCurrentCommentText(habitComments[index]?.[today]?.text || "");
    setShowCommentModal(true);
  };

  // Save comment
  const saveComment = () => {
    if (currentCommentIndex !== null) {
      setHabitComments((prev) => {
        const updated = {
          ...prev,
          [currentCommentIndex]: {
            ...prev[currentCommentIndex],
            [today]: { text: currentCommentText, date: today },
          },
        };

        // Send updated comments to backend
        handleSubmitHabits(savedHabits, habitStatuses, updated);

        return updated;
      });
    }

    setShowCommentModal(false);
    setCurrentCommentIndex(null);
    setCurrentCommentText("");
    commentRefs.current = null; // clean up ref
  };

  // Auto-reset for new day
  useEffect(() => {
    const updatedStatuses = { ...habitStatuses };
    const updatedComments = { ...habitComments };

    savedHabits.forEach((_, index) => {
      if (!updatedStatuses[index]?.[today]) {
        updatedStatuses[index] = {
          ...updatedStatuses[index],
          [today]: STATUS.IN_PROGRESS,
        };
      }
      if (!updatedComments[index]?.[today]) {
        updatedComments[index] = {
          ...updatedComments[index],
          [today]: { text: "", date: today },
        };
      }
    });

    setHabitStatuses(updatedStatuses);
    setHabitComments(updatedComments);
  }, [savedHabits, today]);

  // Focus comment textarea on modal open
  useEffect(() => {
    if (showCommentModal) {
      commentRefs.current?.focus();
    }
  }, [showCommentModal]);

  const remainingHabits = MAX_HABITS - savedHabits.length;
  const buttonClasses = "w-14 flex justify-center px-2 py-1 rounded";

  //sending to backend
  const handleSubmitHabits = async (saved, statuses, comments) => {
    const user = auth.currentUser;
    if (!user) return;

    const todayMonth = currentMonth;
    const todayYear = nowToronto.year;

    //getting all habits
    const habitsPayload = saved.map((habit, index) => ({
      title: habit,
      status: Object.entries(statuses[index] || {}).map(([date, status]) => ({
        date,
        status,
      })),
      comment: Object.entries(comments[index] || {}).map(
        ([date, commentObj]) => ({
          date,
          text: commentObj.text || "",
        }),
      ),
    }));

    const payload = {
      userId: user.uid,
      month: todayMonth,
      year: todayYear,
      habits: habitsPayload,
    };

    try {
      const res = await fetch(`${API_URL}/api/users/habits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(
          "Error saving habits:",
          data.message || "Failed to save habits.",
        );
        return;
      }

      // console.log("Habits saved successfully!", data);
    } catch (err) {
      console.error("Server error while saving habits:", err);
    }
  };

  const fetchHabits = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const currentYear = nowToronto.year;

    try {
      const res = await fetch(
        `${API_URL}/api/users/habits/${user.uid}?month=${currentMonth}&year=${currentYear}`,
      );
      const data = await res.json();

      // console.log(data);
      if (!res.ok) {
        console.error("Failed to fetch habits:", data.message);
        return;
      }

      if (data && Array.isArray(data.habits) && data.habits.length > 0) {
        // extract titles
        const loadedHabits = data.habits.map((h) => h.title);

        // build statuses and comments
        const loadedStatuses = {};
        const loadedComments = {};

        data.habits.forEach((habit, index) => {
          loadedStatuses[index] = {};
          loadedComments[index] = {};

          habit.status.forEach((s) => {
            loadedStatuses[index][s.date] = s.status;
          });

          habit.comment.forEach((c) => {
            loadedComments[index][c.date] = { text: c.text, date: c.date };
          });
        });

        setSavedHabits(loadedHabits);
        setHabitStatuses(loadedStatuses);
        setHabitComments(loadedComments);
      }
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  };

  return (
    <div className="p-4 bg-green-300 rounded shadow flex flex-col gap-4 text-black h-[calc(60vh-8rem)]">
      <h2 className="text-xl font-bold">
        {savedHabits.length === MAX_HABITS
          ? `Your Habits for ${displayMonth}`
          : "Habits to Track"}
      </h2>

      <p>
        {savedHabits.length === MAX_HABITS
          ? `These are your fixed habits for ${displayMonth}.`
          : "Track your daily habits here."}
      </p>

      {remainingHabits > 0 && (
        <>
          <button
            onClick={openModal}
            className="bg-green-600 text-white px-4 py-2 rounded w-40"
          >
            Add Habits
          </button>
          <p>
            You can add {remainingHabits} more habit
            {remainingHabits > 1 ? "s" : ""} this month.
          </p>
        </>
      )}

      {savedHabits.length > 0 && (
        <div className="mt-4 bg-white rounded p-4 shadow flex flex-col gap-2 overflow-auto max-h-[60vh]">
          <h3 className="font-semibold text-lg">Habits for {displayMonth}</h3>

          <div className="flex items-center justify-between font-medium border-b pb-1 mb-2 text-sm text-gray-600">
            <span className="flex-1">Habit</span>
            <div className="flex flex-1 justify-between text-sm">
              <span>Completed</span>
              <span>Not Completed</span>
              <span>In Progress</span>
              <span>Comment</span>
            </div>
          </div>

          <ul className="flex flex-col gap-2">
            {savedHabits.map((habit, index) => (
              <li key={index} className="flex items-center border-b py-1">
                <span className="flex-1 capitalize">{habit}</span>
                <div className="flex flex-1 justify-between text-sm">
                  <button
                    onClick={() => toggleStatus(index, STATUS.COMPLETED)}
                    className={`${buttonClasses} ${
                      habitStatuses[index]?.[today] === STATUS.COMPLETED
                        ? "bg-green-500 text-white"
                        : "border"
                    }`}
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => toggleStatus(index, STATUS.NOT_DONE)}
                    className={`${buttonClasses} ${
                      habitStatuses[index]?.[today] === STATUS.NOT_DONE
                        ? "bg-red-500 text-white"
                        : "border"
                    }`}
                  >
                    <FaTimes />
                  </button>
                  <button
                    onClick={() => toggleStatus(index, STATUS.IN_PROGRESS)}
                    className={`${buttonClasses} ${
                      habitStatuses[index]?.[today] === STATUS.IN_PROGRESS
                        ? "bg-yellow-300 text-black"
                        : "border"
                    }`}
                  >
                    <FaHourglassHalf />
                  </button>
                  <button
                    onClick={() => openCommentModal(index)}
                    className={buttonClasses}
                  >
                    <FaComment />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Habits Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-4 shadow-lg">
            <h3 className="text-lg font-semibold">Add Your Habits</h3>
            <h4 className="text-sm text-red-600">
              Once added, habits cannot be edited for the month.
            </h4>

            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {modalInputs.map((habit, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      value={habit}
                      onChange={(e) => updateModalInput(index, e.target.value)}
                      placeholder={`Habit ${savedHabits.length + index + 1}`}
                      className={`border rounded px-2 py-1 w-full ${
                        modalError[index] ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      onClick={() => removeModalInput(index)}
                      className="text-red-500 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  {modalError[index] && (
                    <p className="text-red-500 text-xs">{modalError[index]}</p>
                  )}
                </div>
              ))}
            </div>

            {savedHabits.length + modalInputs.length < MAX_HABITS && (
              <button
                onClick={addHabitInput}
                disabled={Object.keys(modalError).length > 0}
                className={`px-4 py-1 rounded ${
                  Object.keys(modalError).length > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-600 font-medium"
                }`}
              >
                Add Another
              </button>
            )}

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={Object.keys(modalError).length > 0}
                className={`px-4 py-1 rounded ${
                  Object.keys(modalError).length > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white"
                }`}
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
          <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-4 shadow-lg">
            <h3 className="text-lg font-semibold">Add Comment</h3>
            <h4 className="text-sm text-gray-600">
              {`Date: ${nowToronto.toFormat("d LLLL yyyy")}`}
            </h4>
            <textarea
              ref={commentRefs}
              rows={4}
              value={currentCommentText}
              onChange={(e) => setCurrentCommentText(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Write your comment..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  commentRefs.current = null; // clear ref
                }}
                className="px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={saveComment}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitsToTrack;
