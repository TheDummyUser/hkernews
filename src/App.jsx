import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home"
import About from "./pages/About"
import { FiInfo } from "react-icons/fi"
import { MdArrowBackIosNew } from 'react-icons/md'

const App = () => {
  return (
    <div>
      <Router>
        <nav>
          <div className="p-5 flex items-center font-mono justify-between">
            <div className='flex text-lg underline font-mono'><Link to={`/`}>HACKERNEWS</Link></div>
            <div className='flex space-x-6'>
            <div><Link to="/about"><FiInfo size={19} /></Link></div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="about" element={<About />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
