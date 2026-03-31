import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa'

const SOCIALS = [
  { label: 'GitHub',          icon: <FaGithub />,  href: 'https://github.com/ravnish1' },
  { label: 'LinkedIn',        icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/ravnish-kumar/' },
  { label: 'Medium',          icon: <FaMedium />,   href: 'https://medium.com/@ravkr9968' },
  { label: 'Buy me a coffee', icon: '☕',            href: 'https://www.buymeacoffee.com/ravnishkumar' },
]

export default function Contact() {
  return (
    /* Full viewport height minus navbar — no scrolling needed */
    <div
      className="page-wrapper"
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'center',
          }}
        >
          {/* ── Left — heading ─────────────────────────────── */}
          <div>
            <p className="section-label">Contact</p>
            <h1 className="contact-heading" style={{ marginBottom: '1.25rem' }}>
              Let's build<br />something.
            </h1>
            <p className="contact-sub" style={{ marginBottom: 0 }}>
              Open to interesting projects, collaborations, and
              conversations. Whether you have a project in mind or just
              want to say hi — my inbox is always open.
            </p>
          </div>

          {/* ── Right — actions ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            {/* Primary CTA */}
            <a
              href="mailto:ravnishkumar583@gmail.com"
              className="btn btn-primary"
              style={{ width: 'fit-content' }}
            >
              Send an Email →
            </a>

            {/* Socials */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: '1.25rem',
              }}>
                Find me online
              </p>
              <div className="contact-socials" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social"
                    aria-label={s.label}
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer info */}
            <div style={{
              paddingTop: '1.75rem',
              borderTop: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-3)',
              letterSpacing: '0.08em',
              lineHeight: 1.7,
            }}>
              ravnishkumar583@gmail.com<br />
              New Delhi, India · Available for opportunities
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
