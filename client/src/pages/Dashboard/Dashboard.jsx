import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const idToken = await user.getIdToken();

      const res = await fetch("http://localhost:3000/api/users/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      const data = await res.json();
      // console.log(data);
      if (res.ok) setUserName(data.name);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold ">
        Welcome to your Dashboard, {userName || "User"}!
      </h1>
      <p>Select an option from the sidebar to get started.</p>
      <div className="grid grid-cols-4 gap-1">
        <div className="bg-amber-600 w-[45px] h-[45px]">Card1</div>
        <div className="bg-amber-600 w-[45px] h-[45px]">Card2</div>
        <div className="bg-amber-600 w-[45px] h-[45px]">Card3</div>
        <div className="bg-amber-600 w-[45px] h-[45px]">Card4</div>
      </div>
    </div>
  );
};

export default Dashboard;
