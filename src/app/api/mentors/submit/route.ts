import { getPayload } from 'payload'
import config from '@payload-config'
import { sendEmailToAdmins } from '@/lib/email'

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

    await sendEmailToAdmins(
      payload,
      `New Mentor Application: ${body.name.trim()}`,
      `
        <h2>New Mentor Application</h2>
        <p><strong>Name:</strong> ${body.name.trim()}</p>
        <p><strong>Email:</strong> ${body.email.trim()}</p>
        <p><strong>Phone:</strong> ${body.phone.trim()}</p>
        <p><strong>In Canada since:</strong> ${body.inCanadaSince}</p>
        <p><strong>School-age children:</strong> ${body.hasChildren.trim()}</p>
        <p><strong>Profile:</strong> ${body.profile.trim()}</p>
      `,
    )

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
