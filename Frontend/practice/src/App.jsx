import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <p className='text-green-500'>This practice app</p>
   </div>
  )
}

export default App
