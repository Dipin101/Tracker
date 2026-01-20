import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Navbar from "../components/Navbar.jsx";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //api
  const API_URL = `http://localhost:3000`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const uid = userCredential.user.uid;

      const res = await fetch(`${API_URL}/api/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: uid }),
      });
      const result = await res.json();
      if (res.ok) {
        localStorage.setItem("firebaseUid", uid);
        console.log("Login successful:", result.message);
        navigate("/dashboard");
      } else {
        console.log(result.error || "Login failed");
        alert(result.error || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar></Navbar>

      <div className=" flex flex-1 md:flex-row">
        <div className="hidden md:w-1/2 md:flex items-center justify-center bg-gray-100 p-4">
          <div className="text-4xl md:text-5xl font-bold">Logo/Animation</div>
        </div>

        <div className="md:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
              Sign In
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center items-center my-auto text-4xl"
            >
              {/* making email */}
              <label htmlFor="email" className="flex flex-col gap-1">
                Email
                <input
                  className="p-3 md:p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
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
                <span className="text-sm text-red-500 min-h-[1.25rem]">
                  {errors.email ? errors.email.message : "\u00A0"}
                </span>
              </label>

              {/* password */}
              <label
                htmlFor="password"
                className="flex flex-col gap-1 relative"
              >
                Password
                <input
                  className="p-3 md:p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "The password is required",
                    minLength: {
                      value: 7,
                      message: "Minimum 7 characters needed",
                    },
                    maxLength: { value: 100, message: "Too long" },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-20 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={35} />
                  ) : (
                    <AiFillEye size={35} />
                  )}
                </button>
                <span className="text-red-500 text-sm min-h-[1.25rem]">
                  {errors.password ? errors.password.message : "\u00A0"}
                </span>
              </label>

              {/*  forgot */}
              <div className="flex w-full justify-end my-5 text-2xl">
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  // onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>
              </div>

              {/* button */}
              <button
                type="submit"
                className="w-full md:w-auto text-2xl bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-full transition transform hover:scale-105 active:scale-100"
              >
                Sign In
              </button>

              {/* signup redirect */}
              <p className="text-center text-base mt-2">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
