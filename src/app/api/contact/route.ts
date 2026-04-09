import nodemailer from 'nodemailer'

const RECIPIENT = 'info@brinca.ca'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name?.trim()) {
      return Response.json({ error: 'Missing required field: name' }, { status: 400 })
    }
    if (!email?.trim()) {
      return Response.json({ error: 'Missing required field: email' }, { status: 400 })
    }
    if (!message?.trim()) {
      return Response.json({ error: 'Missing required field: message' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('Contact form: SMTP not configured. Form data:', { name: name.trim(), email: email.trim(), message: message.trim() })
      return Response.json({ success: true }, { status: 200 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT,
      replyTo: `${name.trim()} <${email.trim()}>`,
      subject: `Contact form message from ${name.trim()}`,
      html: `
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <hr />
        <p>${message.trim().replace(/\n/g, '<br />')}</p>
      `,
    })

    return Response.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('Contact form error:', error?.message ?? error)
    return Response.json(
      { error: error?.message ?? 'Failed to send message. Please try again.' },
      { status: 500 },
    )
  }
}
