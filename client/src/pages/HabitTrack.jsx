import React from "react";
import Sidebar from "../Dashboard/components/Sidebar";
import { useForm } from "react-hook-form";
const HabitTrack = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="container flex max-w-screen h-screen">
      <Sidebar />
      <div className="content bg-amber-300 w-screen h-screen">
        <div className="formbox bg-amber-700 m-auto w-2/3 h-1/3 rounded-3xl flex flex-col justify-center items-center">
          <div className="title">
            <h1>Track Your Habits</h1>
          </div>
          <div className="for">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="habit">Add your Habit</label>
              <input
                defaultValue="test"
                className="bg-amber-50"
                {...register("exampleRequired", { required: true })}
              />
              {errors.exampleRequired && <span>This field is required</span>}
              <br />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTrack;
