import React, { useEffect, useRef } from 'react'
import { FaMedium, FaCalendarAlt, FaExternalLinkAlt, FaClock, FaHourglassHalf, FaArrowRight } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Blogs() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".kinetic-text-blogs", {
        y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2
      })
      gsap.from(".subtitle", {
        y: 20, opacity: 0, duration: 1, ease: "power3.out", delay: 0.4
      })

      // Card reveals
      const cards = gsap.utils.toArray(".blog-card")
      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(card,
              { y: 80, opacity: 0, rotationX: 5 },
              { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: "power3.out" }
            )
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="projects-section" ref={containerRef}>
      <div className="projects-header">
        <h1 className="kinetic-text-blogs" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          My Blog
        </h1>
        <p className="subtitle" style={{ fontFamily: 'var(--font-code)', color: 'var(--text-secondary)' }}>
          Insights on technology, development, and AI innovation.
        </p>
      </div>

      <div className="projects-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto'
      }}>
        {/* Blog Card 1 */}
        <article className="project-card neo-panel magnetic-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-code)' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-primary)' }}>
              <FaMedium /> <span>Medium</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <FaCalendarAlt /> <span>Recent</span>
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '1rem', transform: 'translateZ(20px)' }}>
              Harnessing the Power of AI: Why Some Thrive While Others Decline
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', transform: 'translateZ(10px)' }}>
              Exploring how artificial intelligence is reshaping industries and why adaptation is key to success in the modern digital landscape.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['AI', 'Technology', 'Innovation'].map(tag => (
                <span key={tag} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</span>
              ))}
            </div>
          </div>

          <a href="https://medium.com/@ravkr9968/harnessing-the-power-of-ai-why-some-thrive-while-others-decline-bed3c4364bf4" target="_blank" rel="noreferrer" className="neo-btn primary magnetic" style={{ marginTop: 'auto', justifySelf: 'start', padding: '0.8rem 1.5rem', width: 'max-content' }}>
            <span>Read on Medium</span>
            <FaExternalLinkAlt />
          </a>
        </article>

        {/* Placeholder Card 1 */}
        <article className="project-card neo-panel magnetic-card" style={{ opacity: 0.7 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-code)' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <FaMedium /> <span>Medium</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <FaClock /> <span>Coming Soon</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '1rem' }}>
              Building Scalable SaaS Applications
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              A deep dive into the architecture and best practices for creating robust, scalable platforms.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['SaaS', 'Architecture', 'Scalability'].map(tag => (
                <span key={tag} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="neo-btn secondary magnetic" style={{ pointerEvents: 'none', marginTop: 'auto', width: 'max-content', padding: '0.8rem 1.5rem' }}>
            <span>Coming Soon</span>
            <FaHourglassHalf />
          </div>
        </article>
      </div>

      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <a href="https://medium.com/@ravkr9968" target="_blank" rel="noreferrer" className="neo-btn primary magnetic inline-flex">
          <FaMedium />
          <span>Follow on Medium</span>
          <FaArrowRight />
        </a>
      </div>
    </section>
  )
}
