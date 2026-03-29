import React, { useEffect, useRef } from 'react'
import { FaGithub, FaHammer } from 'react-icons/fa6'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split Character Animation for Title
      const kineticTexts = document.querySelectorAll('.kinetic-text-projects')
      if (kineticTexts.length > 0) {
        const splitText = new SplitType('.kinetic-text-projects', { types: 'chars' })
        gsap.from(splitText.chars, {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.03,
          ease: "power4.out",
          delay: 0.2
        })
      }

      gsap.from(".subtitle", {
        y: 20, opacity: 0, duration: 1, ease: "power3.out", delay: 0.6
      })

      // Stagger Fade-In for Cards on Scroll
      const cards = gsap.utils.toArray(".project-card")
      
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        once: true,
        onEnter: batch => gsap.fromTo(batch, 
          { y: 60, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.12, 
            ease: "power3.out"
          }
        )
      })

      // Keep Magnetic 3D tilt
      cards.forEach((card) => {
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          
          const xOffset = (x - rect.width / 2) / (rect.width / 2)
          const yOffset = (y - rect.height / 2) / (rect.height / 2)

          gsap.to(card, {
            rotationY: xOffset * 10,
            rotationX: yOffset * -10,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out",
            boxShadow: `${-xOffset * 15}px ${yOffset * 15}px 0px rgba(226, 255, 61, 0.6)`
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
            boxShadow: "0px 0px 0px rgba(226, 255, 61, 0)"
          })
        }

        card.addEventListener("mousemove", handleMouseMove)
        card.addEventListener("mouseleave", handleMouseLeave)
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="projects-section" ref={containerRef}>
      <div className="projects-header">
        <h1 className="kinetic-text-projects">SYSTEM.DEPLOY();</h1>
        <p className="subtitle">Showcasing innovative solutions with Neo-brutalist precision.</p>
      </div>

      <div className="projects-grid">
        <article className="project-card neo-panel magnetic-card">
          <div className="project-card-image-wrapper">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" alt="Tech" className="project-card-image" />
            <div className="project-card-overlay"></div>
          </div>
          <div className="project-content">
            <h2 className="project-title">Project Orion</h2>
            <p className="project-desc">Next-Gen Machine Learning pipeline built for scale and efficiency.</p>
            <div className="development-status">
              <FaHammer />
              <span>In Development</span>
            </div>
          </div>
        </article>

        <article className="project-card neo-panel magnetic-card">
          <div className="project-card-image-wrapper">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" alt="AI" className="project-card-image" />
            <div className="project-card-overlay"></div>
          </div>
          <div className="project-content">
            <h2 className="project-title">Aether Web</h2>
            <p className="project-desc">High-performance React application leveraging edge functions.</p>
            <div className="development-status">
              <FaHammer />
              <span>In Development</span>
            </div>
          </div>
        </article>

        <article className="project-card neo-panel magnetic-card">
          <div className="project-card-image-wrapper">
            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" alt="Code" className="project-card-image" />
            <div className="project-card-overlay"></div>
          </div>
          <div className="project-content">
            <h2 className="project-title">RoboSync API</h2>
            <p className="project-desc">Real-time IoT synchronization protocol for embedded systems.</p>
            <div className="development-status">
              <FaHammer />
              <span>In Development</span>
            </div>
          </div>
        </article>

        <article className="project-card neo-panel magnetic-card">
          <div className="project-card-image-wrapper">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" alt="Hardware" className="project-card-image" />
            <div className="project-card-overlay"></div>
          </div>
          <div className="project-content">
            <h2 className="project-title">Quantum UI</h2>
            <p className="project-desc">A brutalist component library designed for future web apps.</p>
            <div className="development-status">
              <FaHammer />
              <span>In Development</span>
            </div>
          </div>
        </article>
      </div>

      <div className="github-profile text-center mt-5" style={{ marginTop: '50px' }}>
        <a href="https://github.com/ravnish1" target="_blank" rel="noreferrer" className="neo-btn primary magnetic inline-flex" style={{ display: 'inline-flex' }}>
          <FaGithub style={{ marginRight: '10px' }} />
          <span>View GitHub</span>
        </a>
      </div>
    </section>
  )
}
