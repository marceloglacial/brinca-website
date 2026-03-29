import { getPayload } from 'payload'
import config from '@payload-config'
import type { PartnerSubmission } from '@/payload-types'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { submissionId } = body

    if (!submissionId) {
      return Response.json(
        { message: 'Missing submissionId' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // Get the submission
    const submission = (await payload.findByID({
      collection: 'partner-submissions',
      id: submissionId,
    })) as PartnerSubmission

    if (!submission) {
      return Response.json(
        { message: 'Submission not found' },
        { status: 404 },
      )
    }

    // Create new partner record
    const partner = await payload.create({
      collection: 'partners',
      data: {
        title: submission.title,
        description: submission.description,
        logo: submission.logo || '',
        category: submission.category,
        contact: submission.contact,
        website: submission.website || '',
        social: submission.social || {},
        membershipEmail: submission.membershipEmail || '',
        active: true,
      },
    })

    // Update submission with approved status and link to partner
    await payload.update({
      collection: 'partner-submissions',
      id: submissionId,
      data: {
        status: 'approved',
        approvedPartner: partner.id,
      },
    })

    return Response.json(
      {
        success: true,
        message: 'Partner approved and added to the partners list',
        partnerId: partner.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Partner approval error:', error)
    return Response.json(
      { message: 'Failed to approve partner submission' },
      { status: 500 },
    )
  }
}
