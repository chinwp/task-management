'use server'

import { sql } from '@vercel/postgres';

interface Task {
  id: string
  name: string
  completed: boolean
}

export async function getTasks(): Promise<Task[]> {
  const { rows } = await sql`SELECT * FROM tasks ORDER BY id DESC`;
  return rows as Task[];
}

export async function addTask(name: string): Promise<void> {
  await sql`INSERT INTO tasks (name, completed) VALUES (${name}, false)`;
}

export async function toggleTask(id: string): Promise<void> {
  await sql`UPDATE tasks SET completed = NOT completed WHERE id = ${id}`;
}

export async function deleteTask(id: string): Promise<void> {
  await sql`DELETE FROM tasks WHERE id = ${id}`;
}

