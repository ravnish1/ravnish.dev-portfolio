import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './JobOffer.css' // We can reuse the same CSS

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
const stagger = { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }

export default function InternOffer() {
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
          <motion.h1 className="job-offer-title" variants={fadeUp}>
            Proposing an Internship
          </motion.h1>

          <motion.form className="job-offer-wrapper" onSubmit={handleSubmit} variants={fadeUp}>
            <div className="job-offer-form">
              <div className="form-grid">
              
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input 
                  type="text" 
                  name="companyName" 
                  className="form-input" 
                  placeholder="Your Company Name" 
                  required 
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Email *</label>
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
                <label className="form-label">Role / Designation *</label>
                <select 
                  name="designation" 
                  className="form-select" 
                  required
                  value={formData.designation}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select the role...</option>
                  <option value="SDE Intern">SDE Intern</option>
                  <option value="Frontend Intern">Frontend Intern</option>
                  <option value="Backend Intern">Backend Intern</option>
                  <option value="Fullstack Intern">Fullstack Intern</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Stipend (Per Month) *</label>
                <input 
                  type="text" 
                  name="stipend" 
                  className="form-input" 
                  placeholder="Amount in your currency" 
                  required 
                  value={formData.stipend}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number (Optional)</label>
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
                <label className="form-label">Focus Area</label>
                <select 
                  name="workAreas" 
                  className="form-select"
                  value={formData.workAreas}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select focus areas...</option>
                  <option value="React/Next.js UI">React/Next.js UI</option>
                  <option value="Node/FastAPI Backend">Node/FastAPI Backend</option>
                  <option value="Fullstack Features">Fullstack Features</option>
                  <option value="Learning / Shadowing">Learning / Shadowing</option>
                  <option value="Not Specified">Not Specified</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label">Anything Else (Optional)</label>
                <textarea 
                  name="additionalDetails" 
                  className="form-textarea" 
                  placeholder="Any additional details..."
                  value={formData.additionalDetails}
                  onChange={handleChange}
                />
              </div>

            </div>
            </div>

            <div className="form-submit-wrap" style={{ marginTop: '1rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={status === 'sending' || cooldown > 0}
              >
                {cooldown > 0 
                  ? `Send another message after ${Math.ceil(cooldown / 60)}m` 
                  : status === 'sending' 
                    ? 'Sending...' 
                    : status === 'success' 
                      ? 'Offer Sent!' 
                      : 'Submit Offer'}
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
