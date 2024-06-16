import { useState } from 'react'

import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import { Game } from './screens/Game'
import { Landing } from './screens/Landing'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='h-screen m-0 p-0'>
    <BrowserRouter >
    <Routes>
     <Route  path='/' element={<Landing/>}/>
     <Route  path='/game' element={<Game/>}/>
     </Routes>
   
     </BrowserRouter> 

     </div>
    </>
  )
}

export default App
