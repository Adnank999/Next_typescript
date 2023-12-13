import axios from '@/lib/axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const apiSlice = createApi({
    reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
 

  endpoints: (builder) => ({
    getTasks: builder.query<any, void>({
        query: ()=> '/api/tasks/show',
    }),

    addTasks: builder.mutation({
      query: (task) => ({
        url: '/api/tasks/create',
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: task,
       
      })
    }),

    updateTasks: builder.mutation({
      query: (task) => ({
        url: `/api/tasks/${task.id}/update`,
        method: 'PATCH',
        body: task
      })
    }),

    deleteTasks: builder.mutation({
      query: ({id}) => ({
        url: `/api/tasks/${id}/update`,
        method: 'DELETE',
        body: id
      })
    }),
  }),
});

export const { useGetTasksQuery,useAddTasksMutation,useUpdateTasksMutation,useDeleteTasksMutation } = apiSlice;


