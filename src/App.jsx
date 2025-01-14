import { useState } from 'react'
import './App.css'
import Modal from './Components/Modaladd'
import Updatetable from './Components/Updatetable'
import Modaladd from './Components/Modaladd'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Updatetable/>
      <Modaladd/>
    </>
  )
}

export default App
