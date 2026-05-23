import { getPayload } from 'payload'
import config from '@payload-config'
import { sendEmailToAdmins } from '@/lib/email'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()

    const payload = await getPayload({ config })

    const requiredFields = [
      'name',
      'email',
      'phone',
      'plannedTravelDate',
      'stayDuration',
      'familyDescription',
    ]
    for (const field of requiredFields) {
      if (!body[field]?.toString().trim()) {
        return Response.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
    }

    await payload.create({
      collection: 'mentor-requests',
      overrideAccess: true,
      data: {
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        plannedTravelDate: new Date(body.plannedTravelDate).toISOString(),
        stayDuration: body.stayDuration.trim(),
        familyDescription: body.familyDescription.trim(),
        status: 'pending',
      },
    })

    await sendEmailToAdmins(
      payload,
      `New Mentor Request: ${body.name.trim()}`,
      `
        <h2>New Mentor Request</h2>
        <p><strong>Name:</strong> ${body.name.trim()}</p>
        <p><strong>Email:</strong> ${body.email.trim()}</p>
        <p><strong>Phone:</strong> ${body.phone.trim()}</p>
        <p><strong>Planned travel date:</strong> ${body.plannedTravelDate}</p>
        <p><strong>Planned stay duration:</strong> ${body.stayDuration.trim()}</p>
        <p><strong>Family & immigration description:</strong> ${body.familyDescription.trim()}</p>
      `,
    )

    return Response.json(
      { success: true, message: 'Mentor request received. Thank you!' },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Mentor request submission error:', error?.message ?? error)
    return Response.json(
      { error: error?.message ?? 'Failed to process submission. Please try again.' },
      { status: 500 },
    )
  }
}
