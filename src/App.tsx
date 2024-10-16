import { useState } from 'react'
import './App.css'
import { useTodoListQuery } from './queries'

function App() {
  const [count, setCount] = useState(0)
  const { setParams, pagination, list } = useTodoListQuery()

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <ol>{list?.map(({ id, title }) => <li key={id}>{title}</li>)}</ol>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={() => setParams((prev) => ({ ...prev, done: 0 }))}>
          set Done True
        </button>

        <button onClick={() => pagination?.pageMove(1)}>
          move Pagination1
        </button>

        <button onClick={() => pagination?.pageMove(2)}>
          move Pagination2
        </button>

        <button onClick={() => pagination?.pageMove(3)}>
          move Pagination3
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
