import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const result = await res.json();
      if (res.ok) {
        navigate("/dashboard");
      } else {
        console.log(result.error || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center my-auto"
    >
      <label htmlFor="email" className="flex flex-col">
        Email
        <input
          className="bg-gray-200"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)[\w\s]{8,}\d+@(gmail|yaho|hotmail|outlook|rocketmail)\.com$/i,
          })}
        />
        {errors.Email && <span>This field is required</span>}
      </label>
      <label htmlFor="password" className="flex flex-col">
        Password
        <input
          className="bg-gray-200"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 7,
            maxLength: 100,
          })}
        />
        {errors.Password && <span>This field is required</span>}
      </label>
      <input
        type="submit"
        className="bg-blue-400 px-3 py-2 m-3 rounded-4xl hover:scale-105 active:bg-blue-500 active:scale-100 transition transform"
      />
    </form>
  );
};

export default Signin;
