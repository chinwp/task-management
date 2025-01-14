'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { addTask } from '@/app/actions'

export default function AddTaskForm() {
  const [taskName, setTaskName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (taskName.trim()) {
      await addTask(taskName)
      setTaskName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <Input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter a new task"
        className="flex-grow"
      />
      <Button type="submit">Add Task</Button>
    </form>
  )
}

