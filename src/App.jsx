import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home"
import About from "./pages/About"
import NewStories from "./pages/NewStories"
import {FiHome, FiInfo} from "react-icons/fi"
import {GrFormNext} from "react-icons/gr"

const App = () => {
  return (
    <div>
      <Router>
        <nav>
          <div className=" p-5 flex items-center font-mono justify-between bg-red-400">
            <div className='flex text-lg underline italic'>HACKERNEWS</div>
            <div className='flex space-x-6'>
            <div className=''><Link to="/"><FiHome size={19}/></Link></div>
            <div className=''><Link to="/newstories"><GrFormNext size={19}/></Link></div>
            <div><Link to="/about"><FiInfo size={19} /></Link></div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path='newstories' element={<NewStories />}/>
          <Route path="about" element={<About />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
