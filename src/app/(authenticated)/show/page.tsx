"use client"
import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'

interface Task {
  id: number
  name: string
  category: string
}

const page = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchData = async () => {
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`,
      )

      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/show`,
        {},
      )

      if (response.status !== 200) {
        throw new Error(`Failed to fetch tasks. Status: ${response.status}`)
      }

      setTasks(response.data)
      console.log(tasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  return (
    <div className="flex justify-center">
      <h2 className="text-lg font-bold text-white">Tasks:</h2>

      <div className=" text-white">
        {tasks.length > 0 &&
          tasks.map(task => (
            <div key={task.id}>
              <p>Name: {task.name}</p>
              <p>Category: {task.category}</p>
            </div>
          ))}

        <button
          onClick={fetchData}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Show data
        </button>
      </div>
    </div>
  )
}

export default page
