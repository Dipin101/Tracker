import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import firebase from "firebase/compat/app";
import { auth } from "../firebase";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  //api
  const API_URL = `http://localhost:3000`;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password,
      );

      const uid = userCredential.user.uid;

      const res = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          firebaseUid: uid,
        }),
      });

      const result = await res.json();
      // console.log(result);
      if (res.ok) {
        // console.log("register in manual", result);
        navigate("/signin");
      } else {
        console.log("Server Error", result.error || "Registration failed");
      }
    } catch (errors) {
      console.log("Server Error: ", errors);
    }
  };

  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    const idToken = await user.getIdToken();

    const res = await fetch("http://localhost:3000/api/users/googleauth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    const data = await res.json();

    if (res.ok) {
      // console.log("Google Signin working", data);
      navigate("/dashboard");
    } else {
      console.log(data.error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 md:flex-row">
        {/* Left Side - Logo & Animation */}
        <div className="hidden md:w-1/2 md:flex items-center justify-center bg-gradient-to-br from-[#2c2d5a] to-[#1e1f3f] p-4 relative overflow-hidden">
          {/* Floating animated circles for subtle background motion */}
          <div className="absolute w-40 h-40 bg-green-500 rounded-full opacity-20 animate-ping -top-10 -left-10"></div>
          <div className="absolute w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse top-20 right-10"></div>
          <div className="absolute w-24 h-24 bg-green-600 rounded-full opacity-30 animate-bounce bottom-10 left-16"></div>

          {/* Logo & text in center */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <h1 className="text-9xl text-white font-extrabold">OA</h1>
            <h2 className="text-3xl font-bold text-green-400">OneApp</h2>
            <p className="text-gray-200 mt-2 max-w-xs">
              Track your habits, expenses, and job applications easily.
            </p>
          </div>
        </div>
        {/* right panel */}
        <div className="md:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
              Sign Up
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 text-base md:text-lg"
            >
              {/* firstname */}
              <label htmlFor="firstName" className="flex flex-col gap-1">
                First Name
                <input
                  type="text"
                  className="p-3 md:p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                />
                <span className="text-red-500 text-sm min-h-[1.25rem]">
                  {errors.firstName ? "*This field is required" : "\u00A0"}
                </span>
              </label>

              {/* lastName */}
              <label htmlFor="lastName" className="flex flex-col gap-1">
                Last Name
                <input
                  type="text"
                  className="p-3 md:p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                />
                <span className="text-red-500 text-sm min-h-[1.25rem]">
                  {errors.lastName ? "*This field is required" : "\u00A0"}
                </span>
              </label>

              {/* email */}
              <label htmlFor="" className="flex flex-col gap-1">
                Email
                <input
                  type="email"
                  className="p-3 md:p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[\w.-]+@(gmail|yahoo|hotmail|outlook|rocketmail)\.com$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                <span className="text-red-500 text-sm min-h-[1.25rem]">
                  {errors.email ? errors.email.message : "\u00A0"}
                </span>
              </label>

              {/* phone */}
              <label htmlFor="phone" className="flex flex-col gap-1">
                Phone
                <input
                  type="text"
                  className="p-3 md:p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "The phone field is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be exactly 10 digits",
                    },
                  })}
                  maxLength={10}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                />
                <span className="text-red-500 text-sm min-h-[1.25rem]">
                  {errors.phone ? errors.phone.message : "\u00A0"}
                </span>
              </label>

              {/* password */}
              <label
                htmlFor="Password"
                className="flex flex-col gap-1 relative"
              >
                Password
                <input
                  type={showPassword ? "text" : "password"}
                  className="p-3 md:p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 7,
                      message: "Minimum 7 characters needed",
                    },
                    maxLength: { value: 100, message: "Too long" },
                  })}
                />
                {/* Toggle button for password */}
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={30} />
                  ) : (
                    <AiFillEye size={30} />
                  )}
                </button>
                <span className="text-red-500 text-sm min-h-[1.25rem]">
                  {errors.password ? errors.password.message : "\u00A0"}
                </span>
              </label>

              {/* buttons */}
              <div className="flex flex-col md:flex-row gap-3 mt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-full transition transform hover:scale-105 active:scale-100"
                >
                  Register
                </button>
                <button
                  type="button"
                  className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-full transition transform hover:scale-105 active:scale-100"
                  onClick={googleLogin}
                >
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
