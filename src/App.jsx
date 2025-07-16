import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
