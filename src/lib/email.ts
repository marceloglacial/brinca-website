import type { Payload } from 'payload'

function getContactFormRecipient() {
  const recipient = process.env.CONTACT_FORM_TO?.trim()

  if (!recipient) {
    throw new Error('CONTACT_FORM_TO is not configured')
  }

  return recipient
}

function getAdminRecipients() {
  const recipients = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)

  if (recipients.length === 0) {
    throw new Error('ADMIN_EMAILS is not configured')
  }

  return recipients
}

export async function sendContactFormEmail(
  payload: Payload,
  {
    email,
    message,
    name,
  }: {
    email: string
    message: string
    name: string
  },
) {
  await payload.sendEmail({
    to: getContactFormRecipient(),
    replyTo: email,
    subject: `Contact form message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br />')}</p>
    `,
  })
}

export async function sendEmailToAdmins(payload: Payload, subject: string, htmlContent: string) {
  try {
    await payload.sendEmail({
      to: getAdminRecipients(),
      subject,
      html: htmlContent,
    })
    return true
  } catch (error) {
    console.error('Failed to send admin notification email:', error)
    return false
  }
}
