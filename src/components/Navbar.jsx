import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHouse, FaFileLines, FaBriefcase, FaEnvelope, FaLinkedinIn, FaGithub } from 'react-icons/fa6'
import gsap from 'gsap'

export default function Navbar() {
  const location = useLocation()
  const navRef = useRef(null)

  useEffect(() => {
    // Glassy Floating Pill Entrance Animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.2 }
    )

    // Apply magnetic effect
    const interactives = navRef.current?.querySelectorAll('.magnetic')
    if (!interactives) return

    const handleMouseEnter = () => document.body.classList.add('cursor-hover')
    const handleMouseLeaveGlobal = () => document.body.classList.remove('cursor-hover')

    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeaveGlobal)

      el.addEventListener('mousemove', (e) => {
        const position = el.getBoundingClientRect()
        const x = e.clientX - position.left - position.width / 2
        const y = e.clientY - position.top - position.height / 2
        
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: 'power2.out' })
        
        const children = el.querySelectorAll('span, svg')
        if(children.length > 0) {
          gsap.to(children, { x: x * 0.1, y: y * 0.1, duration: 0.5, ease: 'power2.out' })
        }
      })

      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
        const children = el.querySelectorAll('span, svg')
        if(children.length > 0) {
          gsap.to(children, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
        }
      })
    })

    return () => {
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeaveGlobal)
      })
    }
  }, [])

  return (
    <div className="glass-nav-container">
      <header className="glass-nav" ref={navRef}>
        <nav>
          <ul className="navbar">
            <li>
              <Link to="/" className={`magnetic ${location.pathname === '/' ? 'active' : ''}`}>
                <FaHouse /> <span>Home</span>
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="navbar right-nav">
            <li>
              <a href="/legacy/resume/RAVNISH_KUMAR_CV.pdf" target="_blank" rel="noreferrer" className="magnetic">
                <span>Resume</span>
              </a>
            </li>
            <li>
              <Link to="/projects" className={`magnetic ${location.pathname.startsWith('/projects') ? 'active' : ''}`}>
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link to="/blogs" className={`magnetic ${location.pathname.startsWith('/blogs') ? 'active' : ''}`}>
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <Link to="/contactme" className={`magnetic ${location.pathname.startsWith('/contactme') ? 'active' : ''}`}>
                <span>Contact</span>
              </Link>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ravnish-kumar/" target="_blank" rel="noreferrer" className="magnetic nav-icon">
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a href="https://github.com/ravnish1" target="_blank" rel="noreferrer" className="magnetic nav-icon">
                <FaGithub />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
