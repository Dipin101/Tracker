import React from "react";
import Sidebar from "../Dashboard/components/Sidebar";

const ExpenseTrack = () => {
  return (
    <div className="container flex max-w-screen h-screen">
      <Sidebar />
      <div className="content bg-amber-300 w-screen h-screen">
        <h1>This is Expense tracker</h1>
      </div>
    </div>
  );
};

export default ExpenseTrack;
