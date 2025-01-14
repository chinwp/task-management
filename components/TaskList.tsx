'use client'

import { useState, useEffect } from 'react'
import TaskItem from './TaskItem'
import { getTasks } from '@/app/actions'

export default function TaskList() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks()
      setTasks(fetchedTasks)
    }
    fetchTasks()
  }, [])

  const updateTasks = async () => {
    const updatedTasks = await getTasks()
    setTasks(updatedTasks)
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={updateTasks} />
      ))}
    </ul>
  )
}

