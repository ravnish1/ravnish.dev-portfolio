import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useI18n } from '../i18n/I18nContext'
import './JobOffer.css' // We can reuse the same CSS

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
const stagger = { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }

export default function InternOffer() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    designation: '',
    stipend: '',
    mobile: '',
    workAreas: '',
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
        body: JSON.stringify({ type: 'Intern', ...formData })
      })

      if (response.ok) {
        setStatus('success')
        localStorage.setItem('lastFormSubmit', Date.now().toString())
        setCooldown(120)
        setTimeout(() => setStatus(''), 4000)
        setFormData({
          companyName: '', email: '', designation: '', stipend: '', mobile: '', workAreas: '', additionalDetails: ''
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
          className="job-offer-layout"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <div className="offer-header">
            {/* Header left empty to remove the top back button impression */}
          </div>

          <motion.h1 className="job-offer-title" variants={fadeUp}>
            {t('offer.intern.title')}
          </motion.h1>

          <motion.form className="job-offer-wrapper" onSubmit={handleSubmit} variants={fadeUp}>
            <div className="job-offer-form">
              <div className="form-grid">
              
              <div className="form-group">
                <label className="form-label">{t('offer.company')} *</label>
                <input 
                  type="text" 
                  name="companyName" 
                  className="form-input" 
                  placeholder={t('offer.placeholder.company')} 
                  required 
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('offer.email')} *</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="email@company.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('offer.designation')} *</label>
                <select 
                  name="designation" 
                  className="form-select" 
                  required
                  value={formData.designation}
                  onChange={handleChange}
                >
                  <option value="" disabled>{t('offer.designation.select')}</option>
                  <option value="SDE Intern">SDE Intern</option>
                  <option value="Frontend Intern">Frontend Intern</option>
                  <option value="Backend Intern">Backend Intern</option>
                  <option value="Fullstack Intern">Fullstack Intern</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t('offer.stipend')} *</label>
                <input 
                  type="text" 
                  name="stipend" 
                  className="form-input" 
                  placeholder={t('offer.placeholder.amount')} 
                  required 
                  value={formData.stipend}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('offer.mobile')}</label>
                <input 
                  type="tel" 
                  name="mobile" 
                  className="form-input" 
                  placeholder="+91 XXXXXXXXXX" 
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('offer.work')}</label>
                <select 
                  name="workAreas" 
                  className="form-select"
                  value={formData.workAreas}
                  onChange={handleChange}
                >
                  <option value="" disabled>{t('offer.work.select')}</option>
                  <option value="React/Next.js UI">React/Next.js UI</option>
                  <option value="Node/FastAPI Backend">Node/FastAPI Backend</option>
                  <option value="Fullstack Features">Fullstack Features</option>
                  <option value="Learning / Shadowing">Learning / Shadowing</option>
                  <option value="Not Specified">Not Specified</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label">{t('offer.additional')}</label>
                <textarea 
                  name="additionalDetails" 
                  className="form-textarea" 
                  placeholder="..."
                  value={formData.additionalDetails}
                  onChange={handleChange}
                />
              </div>

            </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ flex: 2 }}
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
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
