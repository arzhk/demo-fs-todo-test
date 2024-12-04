"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTaskContext } from "@/app/context/TaskContext";

export type FormInputs = {
  title: string;
};

function TaskForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const { createTask } = useTaskContext();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await createTask(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 w-full justify-center">
            <input
              {...register("title", { required: true })}
              placeholder="Enter your item..."
              className="border rounded-[16px] border-white/10 px-4 py-3 bg-white/5 w-full lg:min-w-[400px] lg:max-w-[400px]"
            />
            <button
              type="submit"
              className="bg-blue-400 font-semibold text-black px-8 py-2.5 lg:py-0 rounded-[16px] hover:bg-blue-300"
            >
              Add item
            </button>
          </div>
          {errors.title && <span className="text-red-500">This field is required</span>}{" "}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
