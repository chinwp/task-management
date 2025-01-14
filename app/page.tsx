import TaskList from '@/components/TaskList'
import AddTaskForm from '@/components/AddTaskForm'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  )
}

