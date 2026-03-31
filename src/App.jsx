import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Transition from './components/Transition'

import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  return (
    <>
      <Background />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"          element={<Transition><Home /></Transition>} />
          <Route path="/projects"  element={<Transition><Projects /></Transition>} />
          <Route path="/blogs"     element={<Transition><Blogs /></Transition>} />
          <Route path="/contactme" element={<Transition><Contact /></Transition>} />
          <Route path="*"          element={<Transition><Home /></Transition>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
