import React from "react";
import { useForm } from "react-hook-form";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: "ping" }),
      });
      const result = await res.json();
      console.log(result);
      alert(result.message);
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
          {...register("Email", {
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
          {...register("Password", {
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
