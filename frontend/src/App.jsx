import React from 'react'

import Navbar from './components/Navbar.jsx'

import Home from './pages/Home.jsx'
import TrackCarbon from './pages/TrackCarbon.jsx'
import About from './pages/About.jsx'


import { BrowserRouter,Routes,Route } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track-carbon" element={<TrackCarbon />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
