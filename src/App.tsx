import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Index from './components/Index.tsx'
import Mint from './components/Mint.tsx'
import './App.css'

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/mint" element={<Mint />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
