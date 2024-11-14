import { createQueryKeys } from '@lukemorales/query-key-factory'
import axios from 'axios'
import { useList } from './useList'

function sleep(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

const BASE_URL = 'https://my-json-server.typicode.com/1eeminhyeong/demo/'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

type TodoFilter = {
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

export const exampleKeys = createQueryKeys('posts', {
  all: null,
  commonets: {
    queryKey: null,
    queryFn: async () => {
      const res = await axios.get<{ postId: number; id: number; name: string; email: string; body: string }[]>(
        'https://jsonplaceholder.typicode.com/comments',
        { params: { _limit: 10 } }
      )
      return res.data
    },
  },
  suspense: {
    queryKey: null,
    queryFn: () => sleep(2000).then(() => 'hello world!!'),
  },
})

export const useTodoListQuery = () => {
  return useList(todoKeys.list)
}
