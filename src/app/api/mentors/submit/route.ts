import { getPayload } from 'payload'
import config from '@payload-config'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()

    const payload = await getPayload({ config })

    const requiredFields = ['name', 'email', 'phone', 'inCanadaSince', 'hasChildren', 'profile']
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
      collection: 'mentors',
      overrideAccess: true,
      data: {
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        inCanadaSince: new Date(body.inCanadaSince).toISOString(),
        hasChildren: body.hasChildren.trim(),
        profile: body.profile.trim(),
        status: 'pending',
      },
    })

    return Response.json(
      { success: true, message: 'Mentor application received. Thank you!' },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Mentor submission error:', error?.message ?? error)
    return Response.json(
      { error: error?.message ?? 'Failed to process submission. Please try again.' },
      { status: 500 },
    )
  }
}
