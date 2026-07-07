import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { useI18n } from '../i18n/I18nContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const NAV_LINKS = [
    { label: t('nav.home'),     to: '/',          exact: true  },
    { label: t('nav.projects'), to: '/projects',  exact: false },
    { label: t('nav.blog'),     to: '/blogs',     exact: false },
    { label: t('nav.contact'),  to: '/contactme', exact: false },
  ]

  const isActive = ({ to, exact }) =>
    exact ? location.pathname === to : location.pathname.startsWith(to)

  return (
    <>
      <nav
        className={`nav-root${scrolled ? ' is-scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label="Home">
            Ravnish Kumar
          </Link>

          {/* Desktop Links */}
          <div className="nav-links desktop-only" role="list">
            {NAV_LINKS.map((link) => {
              const active = isActive(link)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  role="listitem"
                  className={`nav-link${active ? ' is-active' : ''}`}
                >
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      className="nav-active-bg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="nav-link-text">{link.label}</span>
                </Link>
              )
            })}
            <LanguageSwitcher />
          </div>

          {/* Mobile Toggle */}
          <div className="mobile-toggle-wrapper mobile-only">
            <LanguageSwitcher />
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-overlay-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mobile-menu-links">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <Link
                    to={link.to}
                    className={`mobile-nav-link${isActive(link) ? ' is-active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
