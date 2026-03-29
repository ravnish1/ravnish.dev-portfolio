import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Background() {
  const bgRef = useRef(null)
  
  useEffect(() => {
    // Background Parallax Scrub
    gsap.to('.bg-layer', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    })

    // Cyber Glitch Effect Slider Logic
    let rafId
    const handleMouseMove = (e) => {
      if (!bgRef.current || window.innerWidth <= 768) return
      
      const x = e.clientX
      const y = e.clientY
      
      // Pass mouse coordinates to CSS vars strictly via throttled Animation Frame
      // Prevents CPU stutter natively
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        bgRef.current.style.setProperty('--mouse-x', `${x}px`)
        bgRef.current.style.setProperty('--mouse-y', `${y}px`)
      })
      
      // Calculate mouse speed to determine glitch intensity
      if (!window.lastMouseX) {
        window.lastMouseX = x
        window.lastMouseY = y
      }
      const diffX = Math.abs(x - window.lastMouseX)
      const diffY = Math.abs(y - window.lastMouseY)
      const speed = diffX + diffY
      
      window.lastMouseX = x
      window.lastMouseY = y

      // Only glitch if moving fast enough, creating a kinetic interaction
      if (speed > 5) {
        bgRef.current.classList.add('glitching')
        
        // Randomize the offsets slightly for a chaotic glitch
        bgRef.current.style.setProperty('--glitch-offset-x', `${(Math.random() - 0.5) * 50}px`)
        
        clearTimeout(window.glitchTimer)
        window.glitchTimer = setTimeout(() => {
          if (bgRef.current) bgRef.current.classList.remove('glitching')
        }, 150) // Trail decay
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="bg-system" ref={bgRef} style={{ '--mouse-x': '50vw', '--mouse-y': '50vh', '--glitch-offset-x': '0px' }}>
      {/* Base Layer */}
      <div className="bg-layer base">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
      </div>
      
      {/* Cyber Glitch Slider Layers */}
      <div className="bg-layer glitch-layer glitch-red">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
      </div>
      
      <div className="bg-layer glitch-layer glitch-cyan">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
      </div>

      <div className="bg-layer glitch-layer glitch-green">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
      </div>

      {/* Static Noise Overlay */}
      <div className="bg-noise"></div>
      
      {/* Scanline Overlay */}
      <div className="scanlines"></div>
    </div>
  )
}
