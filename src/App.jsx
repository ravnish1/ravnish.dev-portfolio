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
import MoreAboutMe from './pages/MoreAboutMe'
import JobOffer from './pages/JobOffer'
import InternOffer from './pages/InternOffer'
import FreelanceOffer from './pages/FreelanceOffer'

import { I18nProvider } from './i18n/I18nContext'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import DropMessage from './pages/DropMessage'

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  return (
    <I18nProvider>
      <Background />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"          element={<Transition><Home /></Transition>} />
          <Route path="/projects"  element={<Transition><Projects /></Transition>} />
          <Route path="/blogs"     element={<Transition><Blogs /></Transition>} />
          <Route path="/contactme" element={<Transition><Contact /></Transition>} />
          <Route path="/more-about-me" element={<Transition><MoreAboutMe /></Transition>} />
          <Route path="/drop-message" element={<Transition><DropMessage /></Transition>} />
          <Route path="/hire/job" element={<Transition><JobOffer /></Transition>} />
          <Route path="/hire/intern" element={<Transition><InternOffer /></Transition>} />
          <Route path="/hire/freelance" element={<Transition><FreelanceOffer /></Transition>} />
          <Route path="*"          element={<Transition><Home /></Transition>} />
        </Routes>
      </AnimatePresence>
      <SpeedInsights />
      <Analytics />
    </I18nProvider>
  )
}

export default App
