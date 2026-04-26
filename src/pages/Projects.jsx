import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { FiCoffee, FiX, FiCheck } from 'react-icons/fi'
import { useI18n } from '../i18n/I18nContext'

const PROJECTS = [
  {
    index: '01',
    titleKey: 'project.01.title',
    descKey: 'project.01.desc',
    tags: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS', 'UI/UX'],
    href: 'https://www.launchlive.studio/',
    isLive: true,
  },
  {
    index: '02',
    titleKey: 'project.02.title',
    descKey: 'project.02.desc',
    tags: [
      'DistilBERT/BERT', 'scikit-learn', 'SHAP/LIME',
      'Kafka+Spark', 'MongoDB+HDFS', 'FastAPI+Uvicorn',
      'Streamlit', 'Docker'
    ],
    href: 'https://github.com/ravnish1/equilens-ai',
  },
  {
    index: '03',
    titleKey: 'project.03.title',
    descKey: 'project.03.desc',
    tags: ['Python', 'Streamlit', 'Ollama', 'Pandas', 'Plotly'],
    href: 'https://github.com/ravnish1/local_llm-evaluator',
  },

  {
    index: '04',
    titleKey: 'project.04.title',
    descKey: 'project.04.desc',
    tags: ['Python', 'Discord.py', 'AI', 'Music'],
    href: 'https://github.com/ravnish1/HeyQT',
  },
]

const cardV = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function Projects() {
  const { t } = useI18n()
  const [showTipModal, setShowTipModal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(51)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const upiUri = useMemo(() => {
    return `upi://pay?pa=ravnishkumar583@oksbi&pn=RAVNISH%20KUMAR&am=${selectedAmount}&cu=INR&tn=Support%20Ravnish%20Work&aid=uGICAgMC53cKIAw`
  }, [selectedAmount])

  const qrCodeUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUri)}`
  }, [upiUri])

  return (
    <div className="page-wrapper projects-viewport">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* ── Compact header row ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="projects-header-row"
        >
          <div>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'var(--text-1)',
            }}>
              {t('projects.title')}
            </h1>
          </div>
        </motion.div>

        {/* ── 2×2 card grid ──────────────────────────────────── */}
        <motion.div
          className="projects-grid"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {PROJECTS.map((p) => (
            <motion.article
              key={p.index}
              variants={cardV}
              transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                padding: '1.25rem 1.5rem',
                background: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                transition: 'background 0.2s',
                cursor: 'default',
                overflow: 'hidden',
              }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-3)',
                letterSpacing: '0.1em',
              }}>
                {p.index}
              </span>

              <h2 style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-1)',
                letterSpacing: '-0.01em',
              }}>
                {t(p.titleKey)}
              </h2>

              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-2)',
                lineHeight: 1.65,
                flex: 1,
              }}>
                {t(p.descKey)}
              </p>

              {/* Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border)',
                marginTop: '0.25rem',
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.3rem', columnGap: '0.4rem', flex: 1, paddingRight: '1rem' }}>
                  {p.tags.map((tag, i) => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--text-3)',
                      letterSpacing: '0.05em',
                    }}>
                      {tag}{i < p.tags.length - 1 ? <span style={{ opacity: 0.5, margin: '0 0.1rem' }}>·</span> : ''}
                    </span>
                  ))}
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--text-3)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                >
                  {p.isLive ? (
                    <>
                      <FaExternalLinkAlt size={10} /> {t('projects.liveSite')}
                    </>
                  ) : (
                    <>
                      <FaGithub size={11} /> {t('projects.github')}
                    </>
                  )}
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ── Footer Actions ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            paddingTop: '1.5rem',
            marginTop: 'auto',
            flexShrink: 0,
            flexWrap: 'wrap'
          }}
        >
          <button 
            onClick={() => setShowTipModal(true)}
            className="btn btn-ghost"
            style={{ fontSize: '0.72rem', padding: '0.6rem 1.2rem' }}
          >
            <FiCoffee style={{ marginRight: '0.5rem' }} /> {t('fuel.label')}
          </button>
          <Link 
            to="/more-about-me" 
            className="btn btn-primary"
            style={{ fontSize: '0.72rem', padding: '0.6rem 1.2rem' }}
          >
            {t('projects.collaborate')}
          </Link>
          <a
            href="https://github.com/ravnish1?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            style={{ fontSize: '0.72rem', padding: '0.6rem 1.2rem' }}
          >
            {t('projects.viewAll')}
          </a>
        </motion.div>

      </div>

      {/* Fuel Modal */}
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
              
              <div className="tip-footer">
                <p>{t('fuel.modal.footer')}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
