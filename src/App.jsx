import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Background from './components/Background'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Transition from './components/Transition'

import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'

function App() {
  const location = useLocation()

  useEffect(() => {
    // Initialize Lenis for Cinematic Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Cursor />
      <Background />
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Navbar />
          
          <div className="layout-content">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Transition><Home /></Transition>} />
                <Route path="/projects" element={<Transition><Projects /></Transition>} />
                <Route path="/blogs" element={<Transition><Blogs /></Transition>} />
                <Route path="/contactme" element={<Transition><Contact /></Transition>} />
                <Route path="*" element={<Transition><Home /></Transition>} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
