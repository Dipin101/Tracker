import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";

const Dashboardlayout = () => {
  return (
    <div className="bg-gray-800 text-white w-full fixed top-0 left-0 z-50">
      <Navbar />

      {/* Content area */}
      <div className="ml-64 flex-1 p-6 m-3 bg-white rounded shadow min-h-[calc(100vh-1.5rem)]">
        <h1 className="text-2xl font-bold mb-2">Dashboard Content</h1>
        {/**This should render the content of the nested route */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboardlayout;
