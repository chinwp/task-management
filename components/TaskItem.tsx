'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { toggleTask, deleteTask } from '@/app/actions'

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
    await toggleTask(task.id)
    onUpdate()
  }

  const handleDelete = async () => {
    await deleteTask(task.id)
    onUpdate()
  }

  return (
    <li className="flex items-center justify-between p-2 border rounded">
      <div className="flex items-center gap-2">
        <Checkbox checked={task.completed} onCheckedChange={handleToggle} />
        <span className={task.completed ? 'line-through text-gray-500' : ''}>
          {task.name}
        </span>
      </div>
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Delete
      </Button>
    </li>
  )
}

