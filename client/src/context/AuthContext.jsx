// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // import from compat firebase.js

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use compat method for auth state change
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe; // cleanup on unmount
  }, []);

  const logout = async () => {
    await auth.signOut(); // compat signOut method
    setUser(null);
    console.log("Logged out, session cleared");
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
