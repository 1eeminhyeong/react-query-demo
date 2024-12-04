import _ from 'lodash'
import { sortBy } from 'es-toolkit/compat'

import { lazy, Suspense, useState } from 'react'
import './App.css'
import { exampleKeys, useTodoListQuery } from './queries'
import { useCreatePost, useVoidMutation } from './todoQueries'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const LazyImport = lazy(() => import('./LazyImport'))

function App() {
  const [count, setCount] = useState(0)
  const { setParams, pagination, list } = useTodoListQuery()

  const { mutate } = useCreatePost()
  const { mutate: voidMutate } = useVoidMutation()

  const { data } = useQuery(exampleKeys.commonets)

  const navigate = useNavigate()

  const symbol1 = Symbol ? Symbol('a') : null
  const symbol2 = Symbol ? Symbol('b') : null
  const array = [1, '2', NaN, NaN, symbol1, symbol2, {}, null, undefined]

  // cosole.log('1', _.sortedIndex(array, 3)) // 2
  // console.log('2', _.sortedIndex(array, symbol1)) // 3n

  const array2 = [NaN, symbol1, null, 1, '2', {}, symbol2, NaN, undefined]
  const test = sortBy(array2)

  console.log('3', _.sortedIndex(test, 3)) // 2
  console.log('4', _.sortedIndex(test, symbol1)) // 3
  console.log('5', _.sortedIndex(test, null)) // 5

  // console.log(_.sortedIndex([null, undefined], null))

  return (
    <>
      <button onClick={() => navigate('/detail')}>Hi!</button>
      <h1>Demo</h1>
      <Suspense fallback="loading">
        <LazyImport />
      </Suspense>
      <ol>{list?.map(({ id, title }) => <li key={id}>{title}</li>)}</ol>
      <ol>{data?.map(({ body, id }) => <li key={id}>{body}</li>)}</ol>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>

        <button onClick={() => setParams((prev) => ({ ...prev, done: 0 }))}>set Done True</button>

        <button onClick={() => pagination?.pageMove(1)}>move Pagination1</button>

        <button onClick={() => pagination?.pageMove(2)}>move Pagination2</button>

        <button onClick={() => pagination?.pageMove(3)}>move Pagination3</button>

        <button onClick={() => mutate({ userId: 1, title: 'foo', body: 'bar' })}>Add Post</button>

        <button onClick={() => voidMutate({})}>Add Post</button>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
