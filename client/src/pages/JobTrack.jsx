import React from "react";
import Sidebar from "../Dashboard/components/Sidebar";

const JobTrack = () => {
  return (
    <div className="container flex max-w-screen h-screen">
      <Sidebar />
      <div className="content bg-amber-300 w-screen h-screen">
        <h1>This is Job tracker</h1>
      </div>
    </div>
  );
};

export default JobTrack;
