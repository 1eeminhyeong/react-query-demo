import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useTodoListQuery } from './queries'

function App() {
  const [count, setCount] = useState(0)

  const { queryResult, filter, setFilter, pagination } = useTodoListQuery()

  console.log(queryResult?.data)
  console.log(filter)
  console.log(queryResult?.data?.list)
  console.log(pagination)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={() => setFilter((prev) => ({ ...prev, done: 0 }))}>
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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
