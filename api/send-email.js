import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  // Common destructuring for Job, Intern, and Freelance forms
  const { 
    type, // 'Job', 'Intern', or 'Freelance'
    companyName, 
    email, 
    designation, 
    ctc, 
    stipend, // Intern specific
    budget, // Freelance specific
    mobile, 
    workAreas,
    timeline, // Freelance specific
    additionalDetails 
  } = req.body

  try {
    // Debugging: Verify if environment variables are available (values masked)
    console.log('--- SMTP Configuration Check ---')
    console.log('SMTP_HOST:', process.env.SMTP_HOST ? '✅ Set' : '❌ Missing')
    console.log('SMTP_USER:', process.env.SMTP_USER ? '✅ Set' : '❌ Missing')
    console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? '✅ Set' : '❌ Missing')
    console.log('RECEIVER_EMAIL:', process.env.RECEIVER_EMAIL ? '✅ Set' : '❌ Missing')
    console.log('---------------------------------')

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Verify connection configuration
    await transporter.verify()
    console.log('SMTP Connection: ✅ Verified')

    let subject = ''
    let htmlContent = ''

    if (type === 'Job') {
      subject = `New Job Offer from ${companyName}`
      htmlContent = `
        <h2>Job Offer Details</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Designation:</strong> ${designation}</p>
        <p><strong>CTC (Per Annum):</strong> ${ctc}</p>
        <p><strong>Mobile:</strong> ${mobile || 'N/A'}</p>
        <p><strong>Work Areas:</strong> ${workAreas || 'N/A'}</p>
        <p><strong>Additional Details:</strong></p>
        <p>${additionalDetails || 'None'}</p>
      `
    } else if (type === 'Intern') {
      subject = `New Internship Offer from ${companyName}`
      htmlContent = `
        <h2>Internship Offer Details</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${designation}</p>
        <p><strong>Stipend/Month:</strong> ${stipend}</p>
        <p><strong>Mobile:</strong> ${mobile || 'N/A'}</p>
        <p><strong>Focus Area:</strong> ${workAreas || 'N/A'}</p>
        <p><strong>Additional Details:</strong></p>
        <p>${additionalDetails || 'None'}</p>
      `
    } else if (type === 'Freelance') {
      subject = `New Freelance Proposal from ${companyName}`
      htmlContent = `
        <h2>Freelance Proposal Details</h2>
        <p><strong>Client/Company:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Needed:</strong> ${workAreas}</p>
        <p><strong>Estimated Budget:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Mobile:</strong> ${mobile || 'N/A'}</p>
        <p><strong>Project Details:</strong></p>
        <p>${additionalDetails || 'None'}</p>
      `
    } else if (type === 'Message') {
      subject = `New Message from ${companyName || 'Anonymous'}`
      htmlContent = `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${companyName || 'Anonymous'}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${additionalDetails || 'None'}</p>
      `
    }

    const mailOptions = {
      from: process.env.SMTP_USER, // Sender address (your authenticated email)
      to: process.env.RECEIVER_EMAIL, // The email where you want to receive these offers
      replyTo: email, // Reply to the person who submitted the form
      subject: subject,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ message: 'Email sent successfully!' })
  } catch (error) {
    console.error('Nodemailer Error:', error)
    res.status(500).json({ message: 'Failed to send email', error: error.message })
  }
}
