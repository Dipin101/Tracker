import React from "react";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";

const QuoteCard = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users/quote");
      const data = await res.json();
      const q = data[0].q;
      const a = data[0].a;
      const today = DateTime.now().setZone("America/Toronto").toISODate();
      localStorage.setItem(
        "quoteOfTheDay",
        JSON.stringify({ q, a, date: today }),
      );
      setQuote(data[0].q);
      setAuthor(data[0].a);
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
