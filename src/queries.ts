import { createQueryKeys } from '@lukemorales/query-key-factory'
import axios from 'axios'
import { BaseParams, useList } from './useList'

const BASE_URL = 'https://my-json-server.typicode.com/1eeminhyeong/demo/'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

type TodoFilter = BaseParams & {
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

export const useTodoListQuery = () => {
  return useList(todoKeys.list)
}
