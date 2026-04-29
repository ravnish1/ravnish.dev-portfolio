import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBriefcase, FiAward, FiStar, FiMail, FiCoffee, FiMessageSquare, FiArrowLeft, FiX, FiCheck } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import './MoreAboutMe.css'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
const stagger = { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }

export default function MoreAboutMe() {
  const { t } = useI18n()
  const [showTipModal, setShowTipModal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(51)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // SEO Optimization
    document.title = "More About Me | Ravnish Kumar - Full-Stack Developer"
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = "description"
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = "Learn more about Ravnish Kumar, a Full-Stack Developer creating high-octane digital experiences optimized for speed and results. Open for Job, Intern, and Freelance opportunities."
    
    // Check for mobile
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
      <div className="container">
        <motion.div
          className="more-about-layout"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <div className="more-about-header">
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">{t('partnership.status')}</span>
            </div>
          </div>

          <motion.h1
            className="more-about-title"
            variants={fadeUp}
          >
            {t('partnership.title_start')}
            <span className="text-accent">{t('partnership.title_accent')}</span>
            {t('partnership.title_end')}
          </motion.h1>

          {/* Bold Personality Section: Why Me? */}
          <motion.div className="why-partner-section" variants={fadeUp}>
            <div className="why-grid">
              <div className="why-item">
                <span className="why-number">01</span>
                <div>
                  <h4>{t('partnership.why.label1')}</h4>
                  <p>{t('partnership.why.desc1')}</p>
                </div>
              </div>
              <div className="why-item">
                <span className="why-number">02</span>
                <div>
                  <h4>{t('partnership.why.label2')}</h4>
                  <p>{t('partnership.why.desc2')}</p>
                </div>
              </div>
              <div className="why-item">
                <span className="why-number">03</span>
                <div>
                  <h4>{t('partnership.why.label3')}</h4>
                  <p>{t('partnership.why.desc3')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="more-about-cards" variants={stagger}>
            {/* JOB */}
            <Link to="/hire/job" style={{ textDecoration: 'none' }}>
              <motion.div className="more-about-card" variants={fadeUp}>
                <div className="more-about-icon">
                  <FiBriefcase />
                </div>
                <h3 className="more-about-card-title">{t('partnership.job.title')}</h3>
                <p className="more-about-card-desc">{t('partnership.job.desc')}</p>
              </motion.div>
            </Link>

            {/* INTERN */}
            <Link to="/hire/intern" style={{ textDecoration: 'none' }}>
              <motion.div className="more-about-card" variants={fadeUp}>
                <div className="more-about-icon">
                  <FiAward />
                </div>
                <h3 className="more-about-card-title">{t('partnership.intern.title')}</h3>
                <p className="more-about-card-desc">{t('partnership.intern.desc')}</p>
              </motion.div>
            </Link>

            {/* FREELANCE */}
            <Link to="/hire/freelance" style={{ textDecoration: 'none' }}>
              <motion.div className="more-about-card" variants={fadeUp}>
                <div className="more-about-icon">
                  <FiStar />
                </div>
                <h3 className="more-about-card-title">{t('partnership.freelance.title')}</h3>
                <p className="more-about-card-desc">{t('partnership.freelance.desc')}</p>
              </motion.div>
            </Link>
          </motion.div>

          {/* Interactive Footer */}
          <motion.div className="more-about-interactive-footer" variants={fadeUp}>
            <p className="footer-label">{t('partnership.footer.label')}</p>
            <div className="interactive-icons">
              <button 
                onClick={() => setShowTipModal(true)} 
                className="interactive-icon-item" 
                data-label={t('fuel.label')}
                style={{ border: 'none', cursor: 'pointer' }}
              >
                <FiCoffee />
              </button>
              <Link to="/drop-message" className="interactive-icon-item" data-label={t('fuel.message_label')}>
                <FiMessageSquare />
              </Link>
            </div>
            
            <Link to="/" className="btn btn-ghost" style={{ marginTop: '1.5rem', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              <FiArrowLeft style={{ marginRight: '0.5rem' }} /> {t('partnership.back')}
            </Link>
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
