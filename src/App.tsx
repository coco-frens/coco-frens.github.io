import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './components/Index.tsx'
import Mint from './components/Mint.tsx'
import Sets from './components/Sets.tsx'
import './App.css'

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/sets" element={<Sets />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
