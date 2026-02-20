import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const idToken = await user.getIdToken();
      // console.log("token", idToken);
      const res = await fetch(`${API_URL}/api/users/getProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      const data = await res.json();
      // console.log(data);
      setUserData(data.userData);
    };
    fetchProfile();
  }, []);

  const initials =
    `${userData.firstName?.[0] || ""}${userData.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-md border border-gray-200 p-6">
        {/* Initials */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-semibold text-gray-700">
            {initials}
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">First Name</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-800">
                {userData.firstName || "N/A"}
              </span>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                Edit
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">Last Name</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-800">
                {userData.lastName || "N/A"}
              </span>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                Edit
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">Email</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-800">{userData.email || "N/A"}</span>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                Edit
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Phone</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-800">{userData.phone || "N/A"}</span>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
