import { getPayload } from 'payload'
import config from '@/payload.config'
import type { PartnerSubmission } from '@/payload-types'

export async function approvePartnerSubmission(submissionId: string): Promise<string | null> {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Get the submission
    const submission = (await payload.findByID({
      collection: 'partner-submissions',
      id: submissionId,
    })) as PartnerSubmission

    if (!submission) {
      throw new Error('Submission not found')
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

    return partner.id
  } catch (error) {
    console.error('Failed to approve partner submission:', error)
    throw error
  }
}

export async function rejectPartnerSubmission(
  submissionId: string,
  rejectionReason: string,
): Promise<void> {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Update submission with rejected status
    await payload.update({
      collection: 'partner-submissions',
      id: submissionId,
      data: {
        status: 'rejected',
        rejectionReason,
      },
    })
  } catch (error) {
    console.error('Failed to reject partner submission:', error)
    throw error
  }
}
