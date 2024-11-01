import { useNavigate } from 'react-router-dom'

const Todo = () => {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate(-1)}>back</button>
      Hello world!
    </div>
  )
}

export default Todo
