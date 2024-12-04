"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useTasks from "../hooks/useTasks";

const TaskContext = createContext<ReturnType<typeof useTasks> | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const tasksState = useTasks();

  return <TaskContext.Provider value={tasksState}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
