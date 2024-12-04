from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_credentials=True, allow_methods=["GET", "POST", "PUT", "DELETE"], allow_headers=["*"])

tasks = []
task_counter = 1

class Task(BaseModel):
    id: Optional[int] = None
    title: str
    completed: Optional[bool] = False

@app.get("/tasks", response_model=List[Task])
async def read_tasks(completed: Optional[bool] = None):
    if completed is not None:
        return [task for task in tasks if task["completed"] == completed]
    return tasks

@app.post("/tasks", response_model=Task, status_code=201)
async def create_task(task: Task):
    global task_counter

    if not task.title.strip():
        raise HTTPException(status_code=400, detail="Title cannot be empty")

    new_task = Task(id=task_counter, title=task.title, completed=task.completed)
    tasks.append(new_task);
    task_counter += 1

    return new_task

@app.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, task: Task):
    task = next((task for task in tasks if task.id == task_id), None)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    task.completed = True;

    return task

@app.delete("/tasks/{task_id}", status_code=204)
async def delete_task(task_id: int):
    task = next((task for task in tasks if task.id == task_id), None)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    tasks.remove(task)

    return
