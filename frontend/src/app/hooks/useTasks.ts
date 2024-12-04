import { FormInputs } from "@/components/TaskForm";
import React, { useState, useEffect } from "react";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/tasks");
      const tasks: Task[] = await response.json();

      if (response.ok) {
        setTasks(tasks);
      } else {
        setError("Failed to fetch tasks");
      }
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (data: FormInputs) => {
    try {
      const response = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const completeTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}/complete`, {
        method: "PUT",
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    console.log("tasks_changed", tasks);
  }, [tasks]);

  return { tasks, createTask, completeTask, deleteTask, error, isLoading };
}

export default useTasks;
