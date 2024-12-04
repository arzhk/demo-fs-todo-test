"use client";
import React from "react";
import { Task } from "@/app/hooks/useTasks";
import { useTaskContext } from "@/app/context/TaskContext";

function TaskList() {
  const { tasks } = useTaskContext();

  if (!tasks || tasks.length === 0) {
    return <div className="mt-2 text-lg">No tasks.</div>;
  }

  return (
    <div className="flex flex-col gap-2 items-center lg:max-w-[500px] mx-auto w-full">
      {tasks.map((task: Task) => (
        <div key={task.id} className="border border-white/15 rounded-[16px] bg-white/5 px-4 py-2 w-full">
          {task.title}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
