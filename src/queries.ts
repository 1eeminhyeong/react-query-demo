import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useList } from './useList'

const BASE_URL = 'https://my-json-server.typicode.com/1eeminhyeong/demo/'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

type TodoFilter = {
  offset?: number
  limit?: number
  done?: number
}
type Todo = {
  id: number
  title: string
}

const todoKeys = createQueryKeys('todo', {
  all: null,
  list: (filter: TodoFilter) => ({
    queryKey: [{ filter }],
    queryFn: async () => {
      const [list, count] = await Promise.all([
        axiosInstance.get<{ list: Todo[] }>('todo', { params: filter }),
        axiosInstance.get<{ count: number }>('todo-count'),
      ])

      return { list: list?.data?.list, count: count?.data?.count }
    },
  }),
})

export const useTodoList = () =>
  useQuery(todoKeys.list({ offset: 0, limit: 10 }))

export const useTodoListQuery = () => {
  return useList<TodoFilter, Todo, (typeof todoKeys)['list']>(todoKeys.list, {
    offset: 0,
    limit: 10,
  })
}
