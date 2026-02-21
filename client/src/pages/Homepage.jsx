import React from "react";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#1e1f3f] text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center p-20 text-center bg-gradient-to-b from-[#2c2d5a] to-[#1e1f3f]"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-400">
          Take Control of Your Life
        </h1>
        <p className="text-lg max-w-2xl mb-8 text-gray-300">
          Track your habits, manage your finances, and stay on top of your job
          search—all in one place.
        </p>
        <div className="flex gap-4">
          <Link to="/signup">
            <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition">
              Get Started
            </button>
          </Link>
          <button className="px-6 py-3 bg-transparent border border-green-500 text-green-400 font-semibold rounded hover:bg-green-600 hover:text-white transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Product Section */}
      <section id="products" className="py-20 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-400">
          Products
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-[#2c2d5a] rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              Habit Tracking
            </h3>
            <p className="text-gray-300 text-sm">
              Keep track of your daily habits and measure your progress over
              time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#2c2d5a] rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              Income & Expense Tracking
            </h3>
            <p className="text-gray-300 text-sm">
              Monitor your finances easily and see how your spending patterns
              evolve each month.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#2c2d5a] rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              Job Tracking
            </h3>
            <p className="text-gray-300 text-sm">
              Keep your job applications organized and track your progress
              toward landing your dream job.
            </p>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-8 text-center bg-[#1e1f3f]">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-400">
          About Me
        </h2>
        <p className="max-w-3xl mx-auto text-gray-300 text-base md:text-lg">
          Hi, I'm Dipin. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Consequatur, debitis libero optio nulla veniam eius, numquam
          sequi dignissimos, impedit sint unde ipsum? Sint incidunt iste
          corrupti assumenda similique corporis, magni explicabo delectus illo
          eos laboriosam error libero fuga ipsum at ea non quis sed sapiente
          aspernatur provident excepturi! Totam, esse?
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2d5a] text-gray-300 p-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Dipin Khatri. All rights reserved.
      </footer>
    </div>
  );
};

export default Homepage;
