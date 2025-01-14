'use server'

interface Task {
  id: string
  name: string
  completed: boolean
}

let tasks: Task[] = [];

export async function getTasks(): Promise<Task[]> {
  return tasks;
}

export async function addTask(name: string): Promise<void> {
  const newTask: Task = {
    id: Date.now().toString(),
    name,
    completed: false,
  }
  tasks.push(newTask);
}

export async function toggleTask(id: string): Promise<void> {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
  }
}

export async function deleteTask(id: string): Promise<void> {
  tasks = tasks.filter((t) => t.id !== id);
}

