import React, { useEffect, useRef } from 'react'
import arrowIcon from '../assets/arrow.svg'

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    // Hide custom cursor on mobile touching devices
    if (window.innerWidth <= 768) return

    let rafId
    const handleMouseMove = (e) => {
      // Throttle DOM styling natively for high performance without GSAP GC overhead on pure coordinates
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.left = `${e.clientX}px`
          cursorRef.current.style.top = `${e.clientY}px`
        }
      })
    }

    const onEnter = () => document.body.classList.add('cursor-hover')
    const onLeave = () => document.body.classList.remove('cursor-hover')

    window.addEventListener('mousemove', handleMouseMove)

    // Add glowing hover states to ALL interactive endpoints
    const interactiveElements = document.querySelectorAll('a, button, input, .magnetic-card, .btn, .stat-item, .project-card')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      document.body.classList.remove('cursor-hover')
    }
  }, [])

  return (
    <div className="cursor-flaticon" ref={cursorRef}>
      <img src={arrowIcon} alt="cursor" className="custom-pointer-img" />
    </div>
  )
}
