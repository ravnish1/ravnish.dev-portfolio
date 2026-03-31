import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',     to: '/',          exact: true  },
  { label: 'Projects', to: '/projects',  exact: false },
  { label: 'Blog',     to: '/blogs',     exact: false },
  { label: 'Contact',  to: '/contactme', exact: false },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = ({ to, exact }) =>
    exact ? location.pathname === to : location.pathname.startsWith(to)

  return (
    <nav
      className={`nav-root${scrolled ? ' is-scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <Link to="/" className="nav-logo" aria-label="Home">
          Ravnish Kumar
        </Link>

        <div className="nav-links" role="list">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              role="listitem"
              className={`nav-link${isActive(link) ? ' is-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/resume/RAVNISH_KUMAR_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-resume"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  )
}
