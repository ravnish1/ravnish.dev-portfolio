import React, { useEffect, useRef } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaCoffee, FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'
import gsap from 'gsap'
import profileImg from '../assets/ravnish-image.jpeg'

export default function Contact() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-anim", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} style={{ padding: '150px 5% 100px', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Profile Section */}
      <div className="glass-panel contact-anim" style={{ marginBottom: '3rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', textAlign: 'left' }}>
        <img src={profileImg} alt="Ravnish Kumar" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--accent-color)', boxShadow: '4px 4px 0px rgba(226, 255, 61, 0.2)' }} />
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Ravnish Kumar</h1>
          <p style={{ fontFamily: 'var(--font-code)', color: 'var(--accent-color)', marginBottom: '1rem', fontWeight: 600 }}>Student & Developer</p>
          <p style={{ maxWidth: '600px', color: 'var(--text-secondary)' }}>
            Aspiring developer passionate about building innovative SaaS solutions, integrating AI and MLOps to solve real-world problems.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        {/* Info Grid */}
        <div className="contact-anim">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            Get In Touch
          </h2>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="neo-panel magnetic-card" style={{ padding: '1.5rem', margin: 0, display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}><FaEnvelope /></div>
              <div>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Email</h3>
                <p style={{ fontFamily: 'var(--font-code)' }}>ravnishkumar583@gmail.com</p>
              </div>
            </div>

            <div className="neo-panel magnetic-card" style={{ padding: '1.5rem', margin: 0, display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}><FaMapMarkerAlt /></div>
              <div>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Location</h3>
                <p style={{ fontFamily: 'var(--font-code)' }}>New Delhi, India</p>
              </div>
            </div>

            <div className="neo-panel magnetic-card" style={{ padding: '1.5rem', margin: 0, display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}><FaClock /></div>
              <div>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Response Time</h3>
                <p style={{ fontFamily: 'var(--font-code)' }}>Within 24 hours</p>
              </div>
            </div>

            <div className="neo-panel magnetic-card" style={{ padding: '1.5rem', margin: 0, display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}><FaCoffee /></div>
              <div>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Coffee</h3>
                <p style={{ fontFamily: 'var(--font-code)' }}>
                  <a href="https://www.buymeacoffee.com/ravnishkumar" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>Buy me a coffee</a>
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Social Networks</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/ravnish1" target="_blank" rel="noreferrer" className="glass-panel magnetic" style={{ padding: '1rem', fontSize: '1.2rem', minWidth: '0' }}>
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/ravnish-kumar/" target="_blank" rel="noreferrer" className="glass-panel magnetic" style={{ padding: '1rem', fontSize: '1.2rem', minWidth: '0' }}>
                <FaLinkedin />
              </a>
              <a href="#" className="glass-panel magnetic" style={{ padding: '1rem', fontSize: '1.2rem', minWidth: '0' }}>
                <FaTwitter />
              </a>
              <a href="#" className="glass-panel magnetic" style={{ padding: '1rem', fontSize: '1.2rem', minWidth: '0' }}>
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="contact-anim">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaPaperPlane /> Send Message
          </h2>
          <div className="glass-panel" style={{ padding: '1rem', margin: 0, height: '620px' }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScsp8-i3jF0q587qJaLFWmIBOLuSu3NeLtnLeATx188z8_hyA/viewform?embedded=true"
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              style={{ borderRadius: '4px', background: 'transparent' }}
              title="Contact Form"
            >
              Loading…
            </iframe>
          </div>
        </div>

      </div>
    </section>
  )
}
