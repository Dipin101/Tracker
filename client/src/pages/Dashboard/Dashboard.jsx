import { useEffect, useState } from "react";
import { auth } from "../../firebase";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = auth.currentUser?.uid; // firebaseUid
      if (!token) return;

      const res = await fetch("http://localhost:3000/api/users/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: token }),
      });
      const data = await res.json();
      if (res.ok) setUserName(data.name);
    };

    fetchUser();
  }, []);
  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold ">
        Welcome to your Dashboard, {userName || "User"}!
      </h1>
      <p>Select an option from the sidebar to get started.</p>
    </div>
  );
};

export default Dashboard;
