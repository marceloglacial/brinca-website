'use server'
import { INVALIDATE_INTERVAL } from '@/constants'
import { v2 as cloudinary } from 'cloudinary'
import { unstable_cache } from 'next/cache'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function transformToJpg(publicId: string): string {
  return cloudinary.url(publicId, { format: 'jpg' })
}

export async function getCloudinaryImages(folderPath: string): Promise<string[]> {
  try {
    const result = await unstable_cache(
      async () =>
        cloudinary.api.resources({
          type: 'upload',
          prefix: folderPath,
          max_results: 500,
          resource_type: 'image',
        }),
      [`cloudinary-${folderPath}`],
      { revalidate: INVALIDATE_INTERVAL }
    )()

    const imageUrls = result.resources.map((resource: any) => {
      return {
        src: transformToJpg(resource.public_id),
        width: resource.width,
        height: resource.height,
      }
    })
    return imageUrls
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error)
    throw error
  }
}
