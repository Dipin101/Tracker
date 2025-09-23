import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../pages/Signin";
import Homepage from "../pages/Homepage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
};

export default AppRoutes;
