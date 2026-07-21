import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import { FiArrowLeft, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import './DropMessage.css'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
const stagger = { animate: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } }

export default function DropMessage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    additionalDetails: ''
  })
  
  const [status, setStatus] = useState('')
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = "Drop a Message | Ravnish Kumar"
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = "description"
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = "Drop a message, query, or suggestion for Ravnish Kumar."

    const lastSubmit = localStorage.getItem('lastMessageSubmit')
    if (lastSubmit) {
      const timePassed = Math.floor((Date.now() - parseInt(lastSubmit, 10)) / 1000)
      if (timePassed < 120) {
        setCooldown(120 - timePassed)
      }
    }
  }, [])

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => prev > 0 ? prev - 1 : 0)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [cooldown])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const sendPayload = async (payload) => {
    setStatus('sending')
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Message', ...payload })
      })

      if (response.ok) {
        setStatus('success')
        localStorage.setItem('lastMessageSubmit', Date.now().toString())
        setCooldown(120)
        setTimeout(() => setStatus(''), 4000)
        setFormData({ companyName: '', email: '', additionalDetails: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendPayload(formData)
  }

  const handleAnonymous = () => {
    if (!formData.additionalDetails.trim()) {
      alert("Message is required to send anonymously!")
      return
    }
    sendPayload({
      companyName: 'Anonymous',
      email: 'anonymous@hidden.com',
      additionalDetails: formData.additionalDetails
    })
  }

  const isDisabled = status === 'sending' || cooldown > 0

  const getButtonText = () => {
    if (cooldown > 0) {
      return t('offer.wait')?.replace('{{minutes}}', Math.ceil(cooldown / 60)) || `Wait ${Math.ceil(cooldown / 60)}m`
    }
    if (status === 'sending') return t('offer.sending') || 'Sending...'
    if (status === 'success') return t('offer.sent') || 'Sent!'
    return 'Send'
  }

  return (
    <div className="page-wrapper projects-viewport">
      <div className="container">
        <motion.div 
          className="drop-message-layout"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <div className="dm-container">
            {/* ─── LEFT: Heading + Form ─── */}
            <motion.div className="dm-left" variants={fadeUp}>
              <h1 className="dm-heading">
                Drop a<br /><span className="accent">Message</span>
              </h1>
              <p className="dm-subtitle">
                Please feel free to drop a message and we
                will get back to you as soon as we can.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="dm-fields">
                  <div className="dm-field">
                    <div className="dm-field-inner">
                      <input 
                        type="text"
                        name="companyName"
                        placeholder="Name"
                        autoComplete="name"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="dm-field">
                    <div className="dm-field-inner">
                      <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="dm-field">
                    <div className="dm-field-inner">
                      <textarea 
                        name="additionalDetails"
                        placeholder="Message"
                        required
                        value={formData.additionalDetails}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="dm-actions">
                  <button 
                    type="submit" 
                    className="dm-btn-send"
                    disabled={isDisabled}
                  >
                    {getButtonText()}
                  </button>
                  <button 
                    type="button"
                    onClick={handleAnonymous}
                    className="dm-btn-anon"
                    disabled={isDisabled}
                  >
                    Send Anonymous
                  </button>
                </div>
              </form>
            </motion.div>

            {/* ─── RIGHT: Info ─── */}
            <motion.div className="dm-right" variants={fadeUp}>
              <div className="dm-info-block">
                <span className="dm-info-label">Reach out</span>
                <p className="dm-info-text">
                  <a href="mailto:ravnishkumar583@gmail.com">ravnishkumar583@gmail.com</a>
                </p>
              </div>

              <div className="dm-info-block">
                <span className="dm-info-label">Response time</span>
                <p className="dm-info-text">
                  Usually within 24 hours.<br />
                  Anonymous messages are read too.
                </p>
              </div>

              <div className="dm-info-block">
                <span className="dm-info-label">Connect</span>
                <div className="dm-socials">
                  <a href="https://github.com/ravnish1" target="_blank" rel="noopener noreferrer" className="dm-social-link" aria-label="GitHub">
                    <FiGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/ravnish-kumar/" target="_blank" rel="noopener noreferrer" className="dm-social-link" aria-label="LinkedIn">
                    <FiLinkedin />
                  </a>
                  <a href="mailto:ravnishkumar583@gmail.com" className="dm-social-link" aria-label="Email">
                    <FiMail />
                  </a>
                </div>
              </div>

              <div className="dm-back">
                <button 
                  type="button"
                  onClick={() => navigate(-1)} 
                  className="dm-btn-back"
                >
                  <FiArrowLeft />
                  {t('offer.back') || 'Go Back'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Status Toast */}
          <AnimatePresence>
            {(status === 'success' || status === 'error') && (
              <motion.div 
                className={`dm-toast ${status}`}
                initial={{ opacity: 0, y: 20, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 10, x: '-50%' }}
              >
                {status === 'success' ? '✓ Message sent' : '✕ Something went wrong'}
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </div>
  )
}
