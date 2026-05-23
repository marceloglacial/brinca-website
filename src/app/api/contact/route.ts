import config from '@payload-config'
import { sendContactFormEmail } from '@/lib/email'
import { getPayload } from 'payload'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { name, email, message } = body
    const trimmedName = name?.trim()
    const trimmedEmail = email?.trim()
    const trimmedMessage = message?.trim()
    if (!trimmedName) {
      return Response.json({ error: 'Missing required field: name' }, { status: 400 })
    }
    if (!trimmedEmail) {
      return Response.json({ error: 'Missing required field: email' }, { status: 400 })
    }
    if (!trimmedMessage) {
      return Response.json({ error: 'Missing required field: message' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    await sendContactFormEmail(payload, {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
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
