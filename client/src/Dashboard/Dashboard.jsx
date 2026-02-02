import React from "react";
import Sidebar from "./components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Log out failed: ", error);
    }
  };
  return (
    <div className="container flex max-w-screen h-screen">
      {/* <Sidebar /> */}
      <div className="content bg-amber-300 w-screen h-screen">
        <div className="top flex gap-5 mt-5 mb-5 pl-3 text-4xl">
          <div className="title uppercase font-bold text-white ">Analytics</div>
          <div className="searchbar">Searchbar</div>
          <div className="searchbar">Togglebar</div>
          <div className="searchbar">User</div>
          <button className="bg-red-500 p-5 m-5 " onClick={handleLogout}>
            Log out
          </button>
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
