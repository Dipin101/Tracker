import React from "react";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { fetchFromBackend } from "../api";

const QuoteCard = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const fetchQuote = async () => {
    try {
      const data = await fetchFromBackend("/api/users/quote");

      let userId = localStorage.getItem("userId");
      if (!userId) {
        userId = Math.random().toString(36).substr(2, 9);
        localStorage.setItem("userId", userId);
      }

      const seed = userId
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const today = DateTime.now().setZone("America/Toronto").toISODate();
      const dailyIndex = (seed + new Date(today).getDate()) % data.length;

      const { q, a } = data[dailyIndex];
      localStorage.setItem(
        "quoteOfTheDay",
        JSON.stringify({ q, a, date: today }),
      );
      setQuote(q);
      setAuthor(a);
    } catch (err) {
      console.error("Failed to fetch", err);
      setQuote("Stay consistent and never give up!");
      setAuthor("Unknown");
    }
  };

  useEffect(() => {
    const today = DateTime.now().setZone("America/Toronto").toISODate();
    const savedQuote = localStorage.getItem("quoteOfTheDay");

    if (savedQuote) {
      const { q, a, date } = JSON.parse(savedQuote);
      if (date === today) {
        setQuote(q);
        setAuthor(a);
        return;
      }
    }
    fetchQuote();
  }, []);
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-500">Quote of the Day</h3>
      <p className="mt-3 text-xl text-gray-800 italic">"{quote}"</p>
      <p className="text-gray-400 text-sm mt-2 text-right">— {author}</p>
    </div>
  );
};

export default QuoteCard;
