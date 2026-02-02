import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Homepage from "../pages/Homepage";
import Dashboard from "../Dashboard/Dashboard";
import HabitTrack from "../pages/HabitTrack";
import ExpenseTrack from "../pages/ExpenseTrack";
import JobTrack from "../pages/JobTrack";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/habittrack" element={<HabitTrack />} />
      <Route path="/expensetrack" element={<ExpenseTrack />} />
      <Route path="/jobtrack" element={<JobTrack />} />
    </Routes>
  );
};

export default AppRoutes;
