import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import './DropMessage.css'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
const stagger = { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }

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
    const payload = {
      companyName: 'Anonymous',
      email: 'anonymous@hidden.com',
      additionalDetails: formData.additionalDetails
    }
    sendPayload(payload)
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
          <div className="offer-header"></div>

          <motion.h1 className="drop-message-title" variants={fadeUp}>
            Drop a Message
          </motion.h1>
          <motion.p className="drop-message-subtitle" variants={fadeUp}>
            Suggestions, feedback, or just a hi!
          </motion.p>

          <motion.form className="drop-message-wrapper" onSubmit={handleSubmit} variants={fadeUp}>
            <div className="drop-message-form">
              <div className="form-grid">
              
              <div className="form-group">
                <label className="form-label">Name (Optional)</label>
                <input 
                  type="text" 
                  name="companyName" 
                  className="form-input" 
                  placeholder="Your Name" 
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email (Optional)</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="your@email.com" 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Message *</label>
                <textarea 
                  name="additionalDetails" 
                  className="form-textarea message-textarea" 
                  placeholder="Your message, suggestions etc..."
                  required
                  value={formData.additionalDetails}
                  onChange={handleChange}
                />
              </div>

            </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ flex: 1, minWidth: '150px' }}
                disabled={status === 'sending' || cooldown > 0}
              >
                {cooldown > 0 
                  ? (t('offer.wait')?.replace('{{minutes}}', Math.ceil(cooldown / 60)) || `Wait ${Math.ceil(cooldown / 60)}m`)
                  : status === 'sending' 
                    ? (t('offer.sending') || 'Sending...')
                    : status === 'success' 
                      ? (t('offer.sent') || 'Sent!')
                      : 'Send Message'}
              </button>
              
              <button 
                type="button" 
                onClick={handleAnonymous}
                className="btn btn-ghost"
                style={{ flex: 1, minWidth: '150px', border: '1px solid var(--border)' }}
                disabled={status === 'sending' || cooldown > 0}
              >
                Send Anonymous
              </button>

              <button 
                type="button"
                onClick={() => navigate(-1)} 
                className="btn btn-ghost" 
                style={{ flex: 0.5, minWidth: '100px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}
              >
                {t('offer.back') || 'Go Back'}
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
