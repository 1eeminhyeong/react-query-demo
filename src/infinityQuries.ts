import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/'
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

type Filter = {
  page: number
}
const infinityTodoKey = createQueryKeys('infinityTodo', {
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

const useInfinityTodoList = () => {
  return useInfiniteQuery({
    ...infinityTodoKey.list,
  })
}
