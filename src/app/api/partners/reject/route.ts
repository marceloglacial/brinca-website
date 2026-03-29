import { getPayload } from 'payload'
import config from '@payload-config'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { submissionId, rejectionReason } = body

    if (!submissionId) {
      return Response.json(
        { message: 'Missing submissionId' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // Update submission with rejected status
    await payload.update({
      collection: 'partner-submissions',
      id: submissionId,
      data: {
        status: 'rejected',
        rejectionReason: rejectionReason || '',
      },
    })

    return Response.json(
      {
        success: true,
        message: 'Partner submission rejected',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Partner rejection error:', error)
    return Response.json(
      { message: 'Failed to reject partner submission' },
      { status: 500 },
    )
  }
}
