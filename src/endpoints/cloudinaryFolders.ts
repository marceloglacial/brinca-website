import type { Endpoint } from 'payload'
import { getCloudinaryFolderPaths } from '@/lib/cloudinary'

export const cloudinaryFoldersEndpoint: Endpoint = {
  path: '/cloudinary-folders',
  method: 'get',
  handler: async (req) => {
    if (!req.user) {
      return Response.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    try {
      const folders = await getCloudinaryFolderPaths()
      return Response.json({ folders })
    } catch (error) {
      req.payload.logger.error({
        err: error,
        msg: 'Failed to load Cloudinary folders.',
      })

      return Response.json({ error: 'Unable to load Cloudinary folders.' }, { status: 502 })
    }
  },
}
