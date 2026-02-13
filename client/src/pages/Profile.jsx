import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const idToken = await user.getIdToken();
      const res = await fetch("http://localhost:3000/api/users/getProfile", {
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
  return (
    <div className="text-black">
      <h1>Profile</h1>
      <p>{userData.firstName}</p>
      <p>{userData.lastName}</p>
      <p>{userData.email}</p>
      <p>{userData.phone}</p>
    </div>
  );
};

export default Profile;
