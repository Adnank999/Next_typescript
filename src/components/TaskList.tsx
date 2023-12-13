'use client'
import React, { useState } from 'react'
import { useForm,SubmitHandler } from 'react-hook-form'
import {
  useGetTasksQuery,
  useAddTasksMutation,
  useUpdateTasksMutation,
  useDeleteTasksMutation,
} from '@/features/api/apiSlice'
import { boolean } from 'yup'
import axios from '@/lib/axios'

interface Task {
  name: string,
  category: string,
  checked : string,
}

const TaskList = () => {
  // const { register, handleSubmit, reset } = useForm()
  const [fetching, setFetching] = useState('')

  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery()

  const [addTask] = useAddTasksMutation()
  const [updateTask] = useUpdateTasksMutation()
  const [deleteTask] = useDeleteTasksMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Task>()
 



  const onSubmit: SubmitHandler<Task> = async (formData: Task) => {
    try {
      
      // const check = formData.checked ? 1 : 0;

      
       
      

      await addTask({ ...formData });

      // Reset the form
      // reset();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };


  



    return (
      <main>
      <h1>Task List</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
     
        <label>
          Task Name:
          <input type="text" {...register('name', { required: 'Name is required' })} />
        </label>
        <label>
          Task Category:
          <input type="text" {...register('category', { required: 'Category is required' })} />
        </label>
        <label>
          Task Category:
          <input type="text" {...register('checked', { required: 'Checked is required' })} />
        </label>
        <button type="submit">Add Task</button>
      </form>



    </main>
    )
}

export default TaskList
