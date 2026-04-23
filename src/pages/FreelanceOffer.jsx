import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiServer, FiLayout } from 'react-icons/fi'
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
          <div className="freelance-split">

            {/* LEFT SIDE: SERVICES */}
            <motion.div className="freelance-services" variants={fadeUp}>
              <h1 className="freelance-title">Freelance Proposal</h1>
              <p className="freelance-subtitle">Delivering high-performance digital products from concept to deployment.</p>

              <div className="services-list">
                <div className="service-item">
                  <div className="service-icon"><FiLayout /></div>
                  <div className="service-info">
                    <h3>Frontend & Web Apps</h3>
                    <p>React.js, Next.js, and modern UI architectures.</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon"><FiServer /></div>
                  <div className="service-info">
                    <h3>Backend APIs & Systems</h3>
                    <p>Node.js, Express, FastAPI, and scalable databases.</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon"><FiCode /></div>
                  <div className="service-info">
                    <h3>Fullstack Solutions</h3>
                    <p>End-to-end applications combining fast frontends with powerful APIs.</p>
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
                      <label className="form-label">Client / Company Name *</label>
                      <input type="text" name="companyName" className="form-input" placeholder="Name or Company" required value={formData.companyName} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your Email *</label>
                      <input type="email" name="email" className="form-input" placeholder="email@domain.com" required value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Mobile Number</label>
                      <input type="tel" name="mobile" className="form-input" placeholder="+91 XXXXXXXXXX" value={formData.mobile} onChange={handleChange} />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">Service Needed *</label>
                      <select name="workAreas" className="form-select" required value={formData.workAreas} onChange={handleChange}>
                        <option value="" disabled>Select service...</option>
                        <option value="Frontend Development (React/Next)">Frontend Development (React/Next)</option>
                        <option value="Backend Development (Node/FastAPI)">Backend Development (Node/FastAPI)</option>
                        <option value="Fullstack Application">Fullstack Application</option>
                        <option value="Consulting / Other">Consulting / Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Estimated Budget *</label>
                      <input type="text" name="budget" className="form-input" placeholder="$ / INR" required value={formData.budget} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Timeline *</label>
                      <input type="text" name="timeline" className="form-input" placeholder="e.g. 2-4 weeks" required value={formData.timeline} onChange={handleChange} />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">Project Details</label>
                      <textarea name="additionalDetails" className="form-textarea" style={{ height: '60px' }} placeholder="Tell me about the project..." value={formData.additionalDetails} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-submit-wrap" style={{ marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending' || cooldown > 0}>
                    {cooldown > 0 
                      ? `Send another message after ${Math.ceil(cooldown / 60)}m` 
                      : status === 'sending' 
                        ? 'Sending...' 
                        : status === 'success' 
                          ? 'Proposal Sent!' 
                          : t('freelance.cta', 'Work With Me')}
                  </button>
                </div>
              </form>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
