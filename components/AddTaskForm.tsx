'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { addTask } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

export default function AddTaskForm() {
  const [taskName, setTaskName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (taskName.trim()) {
      setIsLoading(true)
      try {
        await addTask(taskName)
        setTaskName('')
        toast({
          title: "Task added",
          description: `"${taskName}" has been added to your task list.`,
        })
        router.refresh() // Refresh the page to show new task
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add task. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
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
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          'Add Task'
        )}
      </Button>
    </form>
  )
}

