import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text?: string
}) {
  try {
    if (!process.env.SMTP_USER) {
      console.log('[Email disabled] Would send to:', to, '\nSubject:', subject)
      return { success: true }
    }
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'FitKids Staffing <no-reply@fitkidsstaffing.in>',
      to,
      subject,
      html,
      text,
    })
    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}
