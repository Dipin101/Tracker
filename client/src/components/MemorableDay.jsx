import React from "react";

const MemorableDay = () => {
  return (
    <div className="p-4 bg-green-300 rounded shadow flex flex-col gap-2 overflow-auto">
      <h2 className="text-xl font-bold">Memorable Day</h2>
      <p>Here you can write highlights or memorable moments of your day.</p>
      <ul className="list-disc pl-5">
        <li>Scaffolded item 1</li>
        <li>Scaffolded item 2</li>
        <li>Scaffolded item 3</li>
      </ul>
    </div>
  );
};

export default MemorableDay;
