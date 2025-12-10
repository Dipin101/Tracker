import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container flex max-w-screen h-screen">
      <div className="sidemenu bg-amber-800 w-1/5 h-screen">
        <div className="title uppercase font-bold text-white text-4xl mt-5 mb-5 pl-3 pr-3">
          OneApp
        </div>
        <div className="text-2xl text-white ml-3 flex flex-col">
          <Link to="#" className="pt-3 pb-3">
            Habit Tracker
          </Link>
          <Link to="#" className="pt-3 pb-3">
            Expense Tracker
          </Link>
          <Link to="#" className="pt-3 pb-3">
            Job Tracker
          </Link>
        </div>
      </div>
      <div className="content bg-amber-300 w-screen h-screen">
        <div className="top flex gap-5 mt-5 mb-5 pl-3 text-4xl">
          <div className="title uppercase font-bold text-white ">Analytics</div>
          <div className="searchbar">Searchbar</div>
          <div className="searchbar">Togglebar</div>
          <div className="searchbar">User</div>
        </div>
        <div className="contents_container grid grid-cols-3 grid-rows-2 pl-3">
          <div className="card1 bg-black w-1/2 h-80"></div>
          <div className="card1 bg-emerald-400 w-1/2 h-80"></div>
          <div className="card1 bg-white w-1/2 h-80"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
