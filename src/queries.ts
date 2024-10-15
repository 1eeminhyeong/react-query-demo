import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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
        axiosInstance.get<Todo[]>('list', { params: filter }),
        axiosInstance.get('count'),
      ])

      console.log(list.data, count.data)
    },
  }),
})

export const useTodoList = () =>
  useQuery(todoKeys.list({ offset: 0, limit: 10 }))
