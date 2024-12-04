import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <div className="p-10 flex flex-col gap-4">
      <TaskForm />
      <TaskList />
    </div>
  );
}
