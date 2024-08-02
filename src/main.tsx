import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Egalite from './grids/Egalite.tsx'
import ReactDOM from 'react-dom/client'
import Finale from './grids/Finale.tsx'
import Poule1 from './grids/Poule1.tsx'
import Poule2 from './grids/Poule2.tsx'
import App from './App.tsx'
import React from 'react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/poule1" element={<Poule1 />} />
        <Route path="/poule2" element={<Poule2 />} />
        <Route path="/finale" element={<Finale />} />
        <Route path="/egalite" element={<Egalite />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
