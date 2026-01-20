import React from "react";

import Sidebar from "./components/Sidebar";
const Dashboard = () => {
  return (
    <div className="container flex max-w-screen h-screen">
      <Sidebar />
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
