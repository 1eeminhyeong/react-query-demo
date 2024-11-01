import { useState } from 'react'
import './App.css'
import { exampleKeys, useTodoListQuery } from './queries'
import { useCreatePost, useVoidMutation } from './todoQueries'
import { useQuery } from '@tanstack/react-query'
import { hero } from './style.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const { setParams, pagination, list } = useTodoListQuery()

  const { mutate } = useCreatePost()
  const { mutate: voidMutate } = useVoidMutation()

  const { data } = useQuery(exampleKeys.commonets)

  const navigate = useNavigate()

  return (
    <>
      <button onClick={() => navigate('/detail')}>Hi!</button>
      <h1>Vite + React</h1>
      <p className={`${hero}`}>Hello World!</p>
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
