import { getPayload } from 'payload'
import config from '@payload-config'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()

    const payload = await getPayload({ config })

    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'contact']
    for (const field of requiredFields) {
      if (!body[field]) {
        return Response.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        )
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.contact?.email)) {
      return Response.json(
        { error: 'Invalid email address' },
        { status: 400 },
      )
    }

    // Get submitter info from headers or use anonymous
    const submittedBy = body.contact?.email || 'Anonymous'
    const submittedAtDate = new Date()
    const submittedAt = submittedAtDate.toISOString().split('T')[0] // Convert to date string

    // Create submission record
    const submission = await payload.create({
      collection: 'partner-submissions',
      data: {
        title: body.title,
        description: body.description,
        logo: body.logo || '',
        category: body.category,
        contact: body.contact,
        website: body.website || '',
        social: body.social || {},
        membershipEmail: body.membershipEmail || '',
        status: 'pending',
        submittedBy,
        submittedAt,
      },
    })

    return Response.json(
      {
        success: true,
        message: 'Partner submission received. Thank you for your interest!',
        id: submission.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Partner submission error:', error)
    return Response.json(
      { error: 'Failed to process submission. Please try again.' },
      { status: 500 },
    )
  }
}
