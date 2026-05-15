import config from '@payload-config'
import { sendEmailToAdmins } from '@/lib/email'
import { getPayload } from 'payload'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()

    const payload = await getPayload({ config })

    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!body[field]?.toString().trim()) {
        return Response.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const trimmedName = body.name.trim()
    const trimmedEmail = body.email.trim()
    const consentGiven = body.consentGiven === true

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
    }

    await payload.create({
      collection: 'ebook-requests',
      overrideAccess: true,
      data: {
        name: trimmedName,
        email: trimmedEmail,
        consentGiven,
        status: 'pending',
      },
    })

    await sendEmailToAdmins(
      payload,
      `New Ebook Request: ${trimmedName}`,
      `
        <h2>New Ebook Request</h2>
        <p><strong>Name:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Consent Given:</strong> ${consentGiven ? 'Yes' : 'No'}</p>
      `,
    )

    return Response.json(
      { success: true, message: 'Ebook request received. Thank you!' },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Ebook request submission error:', error?.message ?? error)
    return Response.json(
      { error: error?.message ?? 'Failed to process submission. Please try again.' },
      { status: 500 },
    )
  }
}
