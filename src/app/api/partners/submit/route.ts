import { getPayload } from 'payload'
import config from '@payload-config'
import { sendEmailToAdmins } from '@/lib/email'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()

    const payload = await getPayload({ config })

    // Validate: at least one language for title
    if (!body.title_en?.trim() && !body.title_pt?.trim()) {
      return Response.json({ error: 'Missing required field: title' }, { status: 400 })
    }

    // Validate: at least one language for description
    if (!body.description_en?.trim() && !body.description_pt?.trim()) {
      return Response.json({ error: 'Missing required field: description' }, { status: 400 })
    }

    // Validate required fields
    if (!body.category) {
      return Response.json({ error: 'Missing required field: category' }, { status: 400 })
    }
    if (!body.contact) {
      return Response.json({ error: 'Missing required field: contact' }, { status: 400 })
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.contact?.email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const enTitle = body.title_en?.trim() || body.title_pt?.trim()
    const ptTitle = body.title_pt?.trim() || body.title_en?.trim()
    const enDescription = body.description_en?.trim() || body.description_pt?.trim()
    const ptDescription = body.description_pt?.trim() || body.description_en?.trim()

    // Create partner record with English locale, status pending, inactive until approved
    const partner = await payload.create({
      collection: 'partners',
      overrideAccess: true,
      locale: 'en',
      data: {
        title: enTitle,
        description: enDescription,
        logo: body.logo || '',
        category: body.category,
        contact: body.contact,
        website: body.website || '',
        social: body.social || {},
        membershipEmail: body.membershipEmail || '',
        status: 'pending',
        active: false,
      },
    })

    // Set Portuguese locale data
    await payload.update({
      collection: 'partners',
      id: partner.id,
      overrideAccess: true,
      locale: 'pt-BR',
      data: {
        title: ptTitle,
        description: ptDescription,
      },
    })

    await sendEmailToAdmins(
      `New Partner Submission: ${enTitle}`,
      `
        <h2>New Partner Submission</h2>
        <p><strong>Name:</strong> ${enTitle}</p>
        <p><strong>Contact Email:</strong> ${body.contact.email}</p>
        <p><strong>Description:</strong> ${enDescription}</p>
      `,
    )

    return Response.json(
      {
        success: true,
        message: 'Partner submission received. Thank you for your interest!',
        id: partner.id,
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
