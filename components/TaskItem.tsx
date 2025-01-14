'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { toggleTask, deleteTask } from '@/app/actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from '@/components/ui/use-toast'
import { Trash2 } from 'lucide-react'

interface Task {
  id: string
  name: string
  completed: boolean
}

interface TaskItemProps {
  task: Task
  onUpdate: () => void
}

export default function TaskItem({ task, onUpdate }: TaskItemProps) {
  const handleToggle = async () => {
    try {
      await toggleTask(task.id)
      onUpdate()
      toast({
        title: "Task updated",
        description: `Task "${task.name}" has been ${task.completed ? 'uncompleted' : 'completed'}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask(task.id)
      onUpdate()
      toast({
        title: "Task deleted",
        description: `Task "${task.name}" has been removed.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <li className="flex items-center justify-between p-2 border rounded hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-2">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-green-500"
        />
        <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
          {task.name}
        </span>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{task.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  )
}

