import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  // Not authenticated → redirect immediately
  // console.log("ProtectedRoute user:", user, "loading:", loading);

  // Wait for Firebase to decide
  if (loading) return null; // or spinner

  // console.log(user); // checking for user to be null
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Authenticated → allow access
  return children;
};

export default ProtectedRoute;
