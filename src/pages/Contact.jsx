import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa'
import { useI18n } from '../i18n/I18nContext'

const SOCIALS = [
  { label: 'GitHub',          icon: <FaGithub />,  href: 'https://github.com/ravnish1' },
  { label: 'LinkedIn',        icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/ravnish-kumar/' },
  { label: 'Medium',          icon: <FaMedium />,   href: 'https://medium.com/@ravkr9968' },
  { label: 'Buy me a coffee', icon: '☕',            href: 'https://www.buymeacoffee.com/ravnishkumar' },
]

export default function Contact() {
  const { t } = useI18n()

  return (
    /* Full viewport height minus navbar — no scrolling needed */
    <div className="page-wrapper page-viewport">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="contact-layout"
        >
          {/* ── Left — heading ─────────────────────────────── */}
          <div>
            <p className="section-label">{t('contact.label')}</p>
            <h1 className="contact-heading" style={{ marginBottom: '1.25rem' }}>
              {t('contact.heading').split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="contact-sub" style={{ marginBottom: 0 }}>
              {t('contact.sub')}
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
              {t('contact.cta')}
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
                {t('contact.findMe')}
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
              {t('contact.location')}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
