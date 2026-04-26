import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiServer, FiLayout, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import './FreelanceOffer.css'
import './JobOffer.css' // Import for form styling

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
const stagger = { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }

export default function FreelanceOffer() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    workAreas: '',
    budget: '',
    timeline: '',
    mobile: '',
    additionalDetails: ''
  })

  const [status, setStatus] = useState('')
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const lastSubmit = localStorage.getItem('lastFormSubmit')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Freelance', ...formData })
      })

      if (response.ok) {
        setStatus('success')
        localStorage.setItem('lastFormSubmit', Date.now().toString())
        setCooldown(120) // 2 minutes cooldown
        setTimeout(() => setStatus(''), 4000)
        setFormData({
          companyName: '', email: '', workAreas: '', budget: '', timeline: '', mobile: '', additionalDetails: ''
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  return (
    <div className="page-wrapper projects-viewport">
      <div className="container">
        <motion.div
          className="freelance-layout"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <div className="offer-header" style={{ marginBottom: '1rem', width: '100%' }}>
            {/* Header left empty to remove the top back button impression */}
          </div>
          <div className="freelance-split">

            {/* LEFT SIDE: SERVICES */}
            <motion.div className="freelance-services" variants={fadeUp}>
              <h1 className="freelance-title">{t('offer.freelance.title')}</h1>
              <p className="freelance-subtitle">{t('offer.freelance.subtitle')}</p>

              <div className="services-list">
                <div className="service-item">
                  <div className="service-icon"><FiLayout /></div>
                  <div className="service-info">
                    <h3>{t('offer.freelance.service1.title')}</h3>
                    <p>{t('offer.freelance.service1.desc')}</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon"><FiServer /></div>
                  <div className="service-info">
                    <h3>{t('offer.freelance.service2.title')}</h3>
                    <p>{t('offer.freelance.service2.desc')}</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon"><FiCode /></div>
                  <div className="service-info">
                    <h3>{t('offer.freelance.service3.title')}</h3>
                    <p>{t('offer.freelance.service3.desc')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE: FORM */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <form onSubmit={handleSubmit}>
                <div className="freelance-form-container">
                  <div className="form-grid">

                    <div className="form-group full-width">
                      <label className="form-label">{t('offer.company')} *</label>
                      <input type="text" name="companyName" className="form-input" placeholder={t('offer.placeholder.company')} required value={formData.companyName} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t('offer.email')} *</label>
                      <input type="email" name="email" className="form-input" placeholder="email@domain.com" required value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t('offer.mobile')}</label>
                      <input type="tel" name="mobile" className="form-input" placeholder="+91 XXXXXXXXXX" value={formData.mobile} onChange={handleChange} />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">{t('offer.work')} *</label>
                      <select name="workAreas" className="form-select" required value={formData.workAreas} onChange={handleChange}>
                        <option value="" disabled>{t('offer.work.select')}</option>
                        <option value="Frontend Development (React/Next)">Frontend Development (React/Next)</option>
                        <option value="Backend Development (Node/FastAPI)">Backend Development (Node/FastAPI)</option>
                        <option value="Fullstack Application">Fullstack Application</option>
                        <option value="Consulting / Other">Consulting / Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t('offer.budget')} *</label>
                      <input type="text" name="budget" className="form-input" placeholder={t('offer.placeholder.amount')} required value={formData.budget} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t('offer.timeline')} *</label>
                      <input type="text" name="timeline" className="form-input" placeholder={t('offer.placeholder.timeline')} required value={formData.timeline} onChange={handleChange} />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">{t('offer.freelance.details')}</label>
                      <textarea name="additionalDetails" className="form-textarea" style={{ height: '60px' }} placeholder={t('offer.freelance.placeholder.details')} value={formData.additionalDetails} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ flex: 2, justifyContent: 'center' }} 
                    disabled={status === 'sending' || cooldown > 0}
                  >
                    {cooldown > 0 
                      ? t('offer.wait').replace('{{minutes}}', Math.ceil(cooldown / 60))
                      : status === 'sending' 
                        ? t('offer.sending')
                        : status === 'success' 
                          ? t('offer.sent')
                          : t('offer.submit')}
                  </button>
                  <Link 
                    to="/more-about-me" 
                    className="btn btn-ghost" 
                    style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}
                  >
                    {t('offer.back')}
                  </Link>
                </div>
              </form>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
