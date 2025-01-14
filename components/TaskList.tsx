'use client'

import { useState, useEffect } from 'react'
import TaskItem from './TaskItem'
import { getTasks } from '@/app/actions'
import { useRouter } from 'next/navigation'

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const router = useRouter()

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
    router.refresh() // Refresh the page to show updated tasks
  }

  if (tasks.length === 0) {
    return <p className="text-muted-foreground text-center py-4">No tasks yet. Add one above!</p>
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={updateTasks} />
      ))}
    </ul>
  )
}

