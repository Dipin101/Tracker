import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidemenu bg-amber-800 w-1/5 h-screen">
      <div className="title uppercase font-bold text-white text-4xl mt-5 mb-5 pl-3 pr-3">
        <Link to="/dashboard">OneApp</Link>
      </div>
      <div className="text-2xl text-white ml-3 flex flex-col">
        <Link to="/habittrack" className="pt-3 pb-3">
          Habit Tracker
        </Link>
        <Link to="/expensetrack" className="pt-3 pb-3">
          Expense Tracker
        </Link>
        <Link to="/jobtrack" className="pt-3 pb-3">
          Job Tracker
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
