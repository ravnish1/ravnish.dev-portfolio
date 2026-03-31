import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
const stagger = { animate: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } }

const STATS = [
  { num: '10+', label: 'Projects' },
  { num: '25+', label: 'Technologies' },
  { num: '5+', label: 'Certs' },
  { num: '5+', label: 'Hackathons' },
]

const TECH = [
  'Python', 'C++', 'TypeScript', 'React',
  'Next.js', 'Node.js', 'FastAPI', 'PostgreSQL', 
  'MySQL', 'Supabase', 'Firebase', 'TensorFlow', 
  'PyTorch', 'Embedded Systems', 'IoT & Robotics', 
  'UAV Engineering', 'Docker', 'Postman', 'Git'
]

export default function Home() {
  return (
    /* ── Single viewport, vertically centered ─────────────────── */
    <div className="page-wrapper page-viewport">
      <div className="container">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="home-layout"
        >

          {/* ── LEFT — identity + CTA ────────────────────────── */}
          <div>
            <motion.p
              className="hero-eyebrow"
              variants={fadeUp}
              transition={{ duration: 0.45 }}
              style={{ marginBottom: '1.5rem' }}
            >
              Building What Matters &nbsp;·&nbsp; Open to Opportunities
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              style={{
                fontSize: 'clamp(3.5rem, 6.5vw, 6.5rem)',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                color: 'var(--text-1)',
                marginBottom: '2rem',
              }}
            >
              I BUILD<br />
              <span style={{ color: 'var(--text-2)' }}>SYSTEMS.</span>
            </motion.h1>

            <motion.p
              className="hero-desc"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '2.5rem', maxWidth: '420px' }}
            >
              ML + Software + Robotics Engineer.
              <br />
              Building intelligent systems at the intersection of machine learning and
              high-performance software.
            </motion.p>

            <motion.div
              className="hero-actions"
              variants={fadeUp}
              transition={{ duration: 0.45 }}
            >
              <Link to="/projects" className="btn btn-primary">View Projects →</Link>
              <Link to="/contactme" className="btn btn-ghost">Get in Touch</Link>
            </motion.div>
          </div>

          {/* ── RIGHT — stats + tech ──────────────────────────── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* 2×2 stat grid */}
            <div className="stats-grid">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: '1.5rem',
                    borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div style={{
                    fontSize: '2.75rem',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    color: 'var(--text-1)',
                    lineHeight: 1,
                    marginBottom: '0.35rem',
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-2)',
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech pills */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-1)',
                marginBottom: '1.2rem',
              }}>
                Tech Stack
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {TECH.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-1)',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      padding: '0.35rem 0.9rem',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '100px', // Visible oval pill shape
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
