import nodemailer from 'nodemailer'

// For development, use a local SMTP server or comment out actual sending
// For production, use your email service (Resend, SendGrid, AWS SES, etc.)

export async function sendEmailToAdmins(subject: string, htmlContent: string) {
  // Check if email configuration is available
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('Email notification skipped: SMTP configuration not available')
    return false
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Get admin emails from env or use a default
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').filter(Boolean)

    if (adminEmails.length === 0) {
      console.warn('Email notification skipped: No admin emails configured')
      return false
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@brinca.com',
      to: adminEmails.join(','),
      subject,
      html: htmlContent,
    })

    console.log(`Email sent to ${adminEmails.length} admin(s)`)
    return true
  } catch (error) {
    console.error('Failed to send email notification:', error)
    return false
  }
}
