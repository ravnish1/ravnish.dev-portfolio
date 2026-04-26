import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
const stagger = { animate: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } }

const STATS_KEYS = [
  { num: '10+', key: 'home.stats.projects' },
  { num: '15+', key: 'home.stats.technologies' },
  { num: '5+', key: 'home.stats.certifications' },
  { num: '5+', key: 'home.stats.competitions' },
]

const TECH = [
  'Python', 'C++', 'Javascript', 'React.js',
  'FastAPI', 'MongoDB', 'PostgreSQL',
  'MySQL', 'Firebase', 'Supabase', 'Neo4j', 'scikit-learn',
  'n8n', 'Claude Code', 'IoT & Robotics'
]

export default function Home() {
  const { t } = useI18n()

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
              {t('home.eyebrow')}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              style={{
                fontSize: 'clamp(4.5rem, 8vw, 8rem)',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-0.035em',
                color: 'var(--text-1)',
                marginBottom: '1rem',
              }}
            >
              {t('home.title')} <span className="text-accent">{t('home.title.accent')}</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="glitch-wrapper"
            >
              <span
                className="glitch-text"
                data-text={t('home.tagline')}
              >
                {t('home.tagline')}
              </span>
            </motion.div>

            <motion.p
              className="hero-desc"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '2.5rem', maxWidth: '420px' }}
            >
            </motion.p>

            <motion.div
              className="hero-actions"
              variants={fadeUp}
              transition={{ duration: 0.45 }}
              style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
            >
              <Link to="/more-about-me" className="btn btn-primary">Work With Me</Link>
              <a href="/resume/RAVNISH_KUMAR_CV.pdf" target="_blank" rel="noreferrer" download className="btn btn-ghost" style={{ border: '1px solid var(--border)' }}>Get Resume</a>
            </motion.div>

            <motion.div 
              variants={fadeUp}
              transition={{ duration: 0.45, delay: 0.2 }}
              style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <div className="status-dot"></div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Available for new collaborations
              </span>
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
              {STATS_KEYS.map((s, i) => (
                <div
                  key={s.key}
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
                    {t(s.key)}
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
                {t('home.techLabel')}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {TECH.map((tech) => (
                  <span
                    key={tech}
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
                    {tech}
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
