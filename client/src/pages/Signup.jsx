import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { validate } from "../../../server/models/Users";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      });
      const result = await res.json();
      console.log(result);
      if (res.ok) {
        navigate("/signin");
      } else {
        console.log(result.error || "Registration failed");
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center my-auto"
    >
      <label htmlFor="firstName" className="flex flex-col">
        First Name
        <input
          type="text"
          className="bg-gray-200"
          placeholder="First Name"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && <span>This field is required</span>}
      </label>
      <label htmlFor="lastName" className="flex flex-col">
        Last Name
        <input
          type="text"
          className="bg-gray-200"
          placeholder="Last Name"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && <span>This field is required</span>}
      </label>
      <label htmlFor="" className="flex flex-col">
        Email
        <input
          type="email"
          className="bg-gray-200"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)[\w\s]{8,}\d+@(gmail|yahoo|hotmail|outlook|rocketmail)\.com$/i,
          })}
        />
        {errors.email && <span>This field is required</span>}
      </label>
      <label htmlFor="phone" className="flex flex-col">
        Phone
        <input
          type="number"
          className="bg-gray-200"
          placeholder="Phone Number"
          {...register("phone", {
            required: true,
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be exactly 10 digits",
            },
          })}
          onInput={(e) => {
            if (e.target.value.length > 10)
              e.target.value = e.target.value.slice(0, 10);
          }}
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </label>
      <label htmlFor="Password" className="flex flex-col">
        Password
        <input
          type="password"
          className="bg-gray-200"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 7,
            maxLength: 100,
          })}
        />
        {errors.password && <span>This field is required</span>}
      </label>
      <div className="btn_wrapper flex flex-col">
        <input
          type="submit"
          value="Register"
          className="bg-blue-400 px-3 py-2 m-3 rounded-4xl hover:scale-105 active:bg-blue-500 active:scale-100 transition transform"
        />
        <a href="http://localhost:3000/api/auth/google">
          <button
            type="button"
            className="bg-green-400 px-3 py-2 m-3 rounded-4xl hover:scale-105 active:bg-green-500 active:scale-100 transition transform"
          >
            Sign in with Google
          </button>
        </a>
      </div>
    </form>
  );
};

export default Signup;
