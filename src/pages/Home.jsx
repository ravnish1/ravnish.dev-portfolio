import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { FaArrowRight } from 'react-icons/fa6'
import Terminal from '../components/Terminal'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef(null)

  // Typewriter effect logic
  const [typedText, setTypedText] = useState('')
  const texts = [
    "Passionate about Web Development.",
    "Machine Learning Enthusiast.",
    "Intelligent Robotics Systems.",
    "Bridging creativity & logic."
  ]

  useEffect(() => {
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId

    function type() {
      const currentText = texts[textIndex]

      if (isDeleting) {
        setTypedText(currentText.substring(0, charIndex - 1))
        charIndex--
      } else {
        setTypedText(currentText.substring(0, charIndex + 1))
        charIndex++
      }

      let typeSpeed = isDeleting ? 30 : 80

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        typeSpeed = 500
      }

      timeoutId = setTimeout(type, typeSpeed)
    }

    type()
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Parallax and GSAP Initialization
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth > 1024

      // Request 2: Text Reveal on Scroll - Split Character Animation
      const kineticTexts = document.querySelectorAll('.kinetic-text')
      if (kineticTexts.length > 0) {
        const splitText = new SplitType('.kinetic-text', { types: 'chars' })

        gsap.from(splitText.chars, {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top 80%',
          }
        })
      }

      // Rest of hero intro animation
      const tl = gsap.timeline()
      tl.from('.neo-panel-anim', { x: -50, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.5 })
        .from('.stat-item', { y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .from('.cta-btn', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.2")
        .from('.terminal-container', { opacity: 0, scale: 0.95, rotationY: 15, duration: 1, ease: "expo.out" }, "-=1")

      // Request 5: Animated Counter Numbers
      gsap.utils.toArray('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'))
        if (target) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () => {
              const counter = { val: 0 }
              gsap.to(counter, {
                val: target,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                  el.innerText = Math.ceil(counter.val) + "+"
                }
              })
            }
          })
        }
      })

      // Request 4: Pinned Hero Section with Scroll-Linked Fade
      if (isDesktop) {
        ScrollTrigger.create({
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom center',
          pin: true,
          pinSpacing: false,
          scrub: 1,
          animation: gsap.to('.hero-content, .terminal-container', {
            opacity: 0,
            scale: 0.96,
            ease: "none"
          })
        })
      }

      // Request 6: Magnetic Hover Engine (applied universally with quickTo to elements with .magnetic)
      const magnetics = document.querySelectorAll('.magnetic')
      magnetics.forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.4)" })
        const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.4)" })

        el.addEventListener("mousemove", (e) => {
          const { clientX, clientY } = e
          const { height, width, left, top } = el.getBoundingClientRect()
          const x = (clientX - (left + width / 2)) * 0.4 // Max offset control
          const y = (clientY - (top + height / 2)) * 0.4
          xTo(x)
          yTo(y)
        })

        el.addEventListener("mouseleave", () => {
          xTo(0)
          yTo(0)
        })
      })

      // Floating elements parallax on mouse move
      if (isDesktop) {
        const xTo1 = gsap.quickTo('.hero-content', 'x', { duration: 1, ease: 'power2.out' })
        const yTo1 = gsap.quickTo('.hero-content', 'y', { duration: 1, ease: 'power2.out' })
        
        const xTo2 = gsap.quickTo('.terminal-container .terminal', 'x', { duration: 1.5, ease: 'power2.out' })
        const yTo2 = gsap.quickTo('.terminal-container .terminal', 'y', { duration: 1.5, ease: 'power2.out' })
        const rYTo2 = gsap.quickTo('.terminal-container .terminal', 'rotationY', { duration: 1.5, ease: 'power2.out' })
        const rXTo2 = gsap.quickTo('.terminal-container .terminal', 'rotationX', { duration: 1.5, ease: 'power2.out' })

        const handleMouseMove = (e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 20
          const y = (e.clientY / window.innerHeight - 0.5) * 20
          
          xTo1(x * -1)
          yTo1(y * -1)
          xTo2(x * 1.5)
          yTo2(y * 1.5)
          rYTo2(x * 0.5 - 5)
          rXTo2(y * -0.5 + 5)
        }
        
        document.addEventListener("mousemove", handleMouseMove)
        return () => document.removeEventListener("mousemove", handleMouseMove)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="home-wrapper" ref={containerRef}>
      <section className="hero-section">
        <div className="hero-content">
          <div className="name-container">
            <h1 className="kinetic-text">RAVNISH</h1>
            <h1 className="kinetic-text outline-text">KUMAR</h1>
          </div>

          <div className="role-container neo-panel neo-panel-anim">
            <h2 className="typewriter-text">
              <span className="typed-text">{typedText}</span>
              <span className="cursor">|</span>
            </h2>
            <p className="quote">Engineering the future. One line of code at a time.</p>
          </div>

          <div className="tech-stats">
            <div className="stat-item glass-panel magnetic cursor-pointer hover:cursor-none">
              <div className="stat-number" data-target="10">0+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item glass-panel magnetic cursor-pointer hover:cursor-none">
              <div className="stat-number" data-target="25">0+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-item glass-panel magnetic cursor-pointer hover:cursor-none">
              <div className="stat-number" data-target="5">0+</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat-item glass-panel magnetic cursor-pointer hover:cursor-none">
              <div className="stat-number" data-target="5">0+</div>
              <div className="stat-label">Hackathon Wins</div>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/projects" className="cta-btn neo-btn primary magnetic">
              <span>View Projects</span>
              <FaArrowRight />
            </Link>
            <a href="/legacy/contactme/" className="cta-btn neo-btn secondary magnetic">
              <span>Contact Me</span>
            </a>
          </div>
        </div>

        <div className="terminal-container floating">
          <Terminal />
        </div>
      </section>

    </div>
  )
}
