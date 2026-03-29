import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload'
import { sendEmailToAdmins } from '@/lib/email'
import type { PartnerSubmission } from '@/payload-types'

export const beforeChangeHook: CollectionBeforeChangeHook<PartnerSubmission> = async ({
  data,
  operation,
}) => {
  // Only send email on creation of new submissions
  if (operation !== 'create') {
    return data
  }

  // Schedule email sending for after the operation completes (use afterChange for that)
  return data
}

export const afterChangeHook: CollectionAfterChangeHook<PartnerSubmission> = async ({
  doc,
  operation,
}) => {
  // Send email notification after submission is created
  if (operation !== 'create') {
    return doc
  }

  // Send email to admins
  const subject = `New Partner Submission: ${doc.title}`
  const htmlContent = `
    <h2>New Partner Submission</h2>
    <p><strong>Partner Name:</strong> ${doc.title}</p>
    <p><strong>Description:</strong> ${doc.description}</p>
    <p><strong>Contact Email:</strong> ${doc.contact?.email || 'N/A'}</p>
    <p><strong>Submitted By:</strong> ${doc.submittedBy || 'Anonymous'}</p>
    <p><strong>Submitted At:</strong> ${doc.submittedAt || 'N/A'}</p>
    <hr />
    <p><a href="${process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3000'}/admin/collections/partner-submissions/${doc.id}">Review Submission in Admin Panel</a></p>
  `

  await sendEmailToAdmins(subject, htmlContent)

  return doc
}
