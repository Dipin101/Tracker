import React from "react";

const Tab = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2
        -mb-1
        rounded-t-lg
        border border-b-0
        ${
          isActive
            ? "bg-white border-gray-300 text-black font-semibold"
            : "bg-gray-200 border-gray-300 text-gray-600"
        }
        transition-colors ease-in-out duration-200
        hover:bg-gray-100
      `}
    >
      {title}
    </button>
  );
};

export default Tab;
