import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa'
import { FiCoffee, FiX, FiCheck, FiInstagram, FiMessageSquare } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

const SOCIALS = [
  { label: 'GitHub', icon: <FaGithub />, href: 'https://github.com/ravnish1' },
  { label: 'LinkedIn', icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/ravnish-kumar/' },
  { label: 'Medium', icon: <FaMedium />, href: 'https://medium.com/@ravkr9968' },
  { label: 'Instagram', icon: <FiInstagram />, href: 'https://instagram.com/rayx_shoots' },
]

export default function Contact() {
  const { t } = useI18n()
  const [showTipModal, setShowTipModal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(51)

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768

  const upiUri = useMemo(() => {
    const pa = 'ravnishkumar583@oksbi'
    const pn = encodeURIComponent('RAVNISH KUMAR')
    const cu = 'INR'
    return `upi://pay?pa=${pa}&pn=${pn}&am=${selectedAmount}&cu=${cu}`
  }, [selectedAmount])

  const qrCodeUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUri)}`
  }, [upiUri])

  return (
    /* Full viewport height minus navbar — no scrolling needed */
    <div className="page-wrapper page-viewport contact-viewport">
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
              {t('contact.heading')} <span className="text-accent">{t('contact.heading.accent')}</span>
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
            <div className="contact-actions">
              <a
                href="mailto:ravnishkumar583@gmail.com"
                className="btn btn-primary"
              >
                {t('contact.cta')}
              </a>
              <button
                onClick={() => setShowTipModal(true)}
                className="btn btn-ghost"
              >
                <FiCoffee style={{ marginRight: '0.5rem' }} /> {t('fuel.label')}
              </button>
              <Link
                to="/drop-message"
                className="btn btn-ghost"
              >
                <FiMessageSquare style={{ marginRight: '0.5rem' }} /> {t('fuel.message_label')}
              </Link>
            </div>

            {/* Socials */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: '1rem',
              }}>
                {t('contact.findMe')}
              </p>
              <div className="contact-socials">
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
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-3)',
              letterSpacing: '0.08em',
              lineHeight: 1.5,
            }}>
              ravnishkumar583@gmail.com<br />
              {t('contact.location')}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Tip Modal */}
      <AnimatePresence>
        {showTipModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTipModal(false)}
          >
            <motion.div
              className="tip-modal"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setShowTipModal(false)}>
                <FiX />
              </button>

              <div className="tip-header">
                <div className="tip-icon-glow">
                  <FiCoffee />
                </div>
                <h2>{t('fuel.modal.title')}</h2>
                <p>{t('fuel.modal.message')}</p>
              </div>

              <div className="amount-selector">
                <p className="selector-label">{t('fuel.modal.select')}</p>
                <div className="amount-options">
                  {[21, 51, 101, 501].map(amt => (
                    <button
                      key={amt}
                      className={`amount-btn ${selectedAmount === amt ? 'active' : ''}`}
                      onClick={() => setSelectedAmount(amt)}
                    >
                      ₹{amt}
                      {selectedAmount === amt && <FiCheck className="check-icon" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="payment-action">
                {isMobile ? (
                  <a href={upiUri} className="btn btn-primary upi-pay-btn">
                    {t('fuel.modal.pay').replace('{{amount}}', selectedAmount)}
                  </a>
                ) : (
                  <div className="qr-fallback">
                    <p className="qr-label">{t('fuel.modal.scan').replace('{{amount}}', selectedAmount)}</p>
                    <div className="qr-frame">
                      <img src={qrCodeUrl} alt="UPI QR Code" />
                    </div>
                    <p className="qr-help">{t('fuel.modal.help')}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
