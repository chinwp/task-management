'use server'

import { kv } from '@vercel/kv'

interface Task {
  id: string
  name: string
  completed: boolean
}

export async function getTasks(): Promise<Task[]> {
  const tasks = await kv.get<Task[]>('tasks') || []
  return tasks
}

export async function addTask(name: string): Promise<void> {
  const tasks = await getTasks()
  const newTask: Task = {
    id: Date.now().toString(),
    name,
    completed: false,
  }
  tasks.push(newTask)
  await kv.set('tasks', tasks)
}

export async function toggleTask(id: string): Promise<void> {
  const tasks = await getTasks()
  const task = tasks.find((t) => t.id === id)
  if (task) {
    task.completed = !task.completed
    await kv.set('tasks', tasks)
  }
}

export async function deleteTask(id: string): Promise<void> {
  const tasks = await getTasks()
  const updatedTasks = tasks.filter((t) => t.id !== id)
  await kv.set('tasks', updatedTasks)
}

