import { createQueryKeys } from '@lukemorales/query-key-factory'
import axios from 'axios'
import { useCustomMutation } from './useCustomMutation'

const BASE_URL = 'https://jsonplaceholder.typicode.com/'
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

type Filter = {
  page: number
}
export const infinityTodoKey = createQueryKeys('infinityTodo', {
  all: null,
  list: (filter: Filter) => ({
    queryKey: [{ filter }],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axiosInstance.get<{ userId: number; id: number; title: string; completed: boolean }[]>('todos', {
        params: { _page: pageParam },
      })
      return res.data
    },
  }),
})

type Todo = {
  title: string
  body: string
  userId: number
}
export function useCreatePost() {
  return useCustomMutation<Todo, Todo & { id: number }>({
    mutationFn: (body) => axiosInstance.post('posts', body),
  })
}
export function useVoidMutation() {
  return useCustomMutation<unknown, Todo>({
    mutationFn: () => axiosInstance.post('post22'),
  })
}
