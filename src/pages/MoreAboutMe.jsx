import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiBriefcase, FiAward, FiStar, FiMail, FiCoffee, FiMessageSquare } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './MoreAboutMe.css'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
const stagger = { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }

export default function MoreAboutMe() {
  // Ensure we start at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page-wrapper projects-viewport">
      <div className="container">
        <motion.div 
          className="more-about-layout"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <div className="more-about-header">
            <h2 className="more-about-logo">More About Me</h2>
            <Link to="/contactme" className="btn btn-primary" style={{ fontSize: '0.7rem' }}>
              A FULL-TIME GIG? LET'S TALK!
            </Link>
          </div>

          <motion.h1 
            className="more-about-title"
            variants={fadeUp}
          >
            Hire Ravnish For...
          </motion.h1>

          <motion.div className="more-about-cards" variants={stagger}>
            {/* JOB */}
            <Link to="/hire/job" style={{ textDecoration: 'none' }}>
              <motion.div className="more-about-card" variants={fadeUp}>
                <div className="more-about-icon">
                  <FiBriefcase />
                </div>
                <h3 className="more-about-card-title">Job</h3>
                <p className="more-about-card-desc">Full-time position at your company.</p>
              </motion.div>
            </Link>

            {/* INTERN */}
            <Link to="/hire/intern" style={{ textDecoration: 'none' }}>
              <motion.div className="more-about-card" variants={fadeUp}>
                <div className="more-about-icon">
                  <FiAward />
                </div>
                <h3 className="more-about-card-title">Intern</h3>
                <p className="more-about-card-desc">Internship opportunities and learning.</p>
              </motion.div>
            </Link>

            {/* FREELANCE */}
            <Link to="/hire/freelance" style={{ textDecoration: 'none' }}>
              <motion.div className="more-about-card" variants={fadeUp}>
                <div className="more-about-icon">
                  <FiStar />
                </div>
                <h3 className="more-about-card-title">Freelance</h3>
                <p className="more-about-card-desc">Project-based work and gigs.</p>
              </motion.div>
            </Link>
          </motion.div>

          {/* Footer actions */}
          <motion.div className="more-about-footer" variants={fadeUp}>
            <Link to="/contactme" className="btn btn-ghost" style={{ fontSize: '0.75rem', gap: '0.5rem' }}>
              <FiMail /> Email Me
            </Link>
            <a href="https://github.com/ravnish1" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: '0.75rem', gap: '0.5rem' }}>
              <FiCoffee /> Sponsor My Work
            </a>
            <Link to="/contactme" className="btn btn-ghost" style={{ fontSize: '0.75rem', gap: '0.5rem' }}>
              <FiMessageSquare /> Drop a Message
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
