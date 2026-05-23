type CloudinaryResource = {
  asset_folder?: string
  asset_id?: string
  display_name?: string
  public_id: string
  secure_url?: string
}

type CloudinaryResourcesResponse = {
  next_cursor?: string
  resources?: CloudinaryResource[]
}

export type CloudinaryGalleryImage = {
  alt: string
  id: string
  src: string
}

function normalizeFolderPath(folderPath: string) {
  return folderPath.trim().replace(/^\/+|\/+$/g, '')
}

function getCloudinaryCredentials() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary environment variables are not configured.')
  }

  return { apiKey, apiSecret, cloudName }
}

function getImageAlt(resource: CloudinaryResource) {
  if (resource.display_name) {
    return resource.display_name
  }

  const name = resource.public_id.split('/').pop() ?? resource.public_id
  return name.replace(/[-_]+/g, ' ')
}

export async function getCloudinaryFolderImages(
  folderPath?: string | null,
): Promise<CloudinaryGalleryImage[]> {
  if (!folderPath) {
    return []
  }

  const normalizedFolderPath = normalizeFolderPath(folderPath)
  if (!normalizedFolderPath) {
    return []
  }

  const { apiKey, apiSecret, cloudName } = getCloudinaryCredentials()
  const authorization = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`

  const images: CloudinaryGalleryImage[] = []
  let nextCursor: string | undefined

  do {
    const apiUrl = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`)
    apiUrl.searchParams.set('max_results', '500')
    apiUrl.searchParams.set('prefix', `${normalizedFolderPath}/`)

    if (nextCursor) {
      apiUrl.searchParams.set('next_cursor', nextCursor)
    }

    const response = await fetch(apiUrl.toString(), {
      headers: {
        Authorization: authorization,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      const detail = await response.text()
      throw new Error(`Failed to load Cloudinary folder "${normalizedFolderPath}": ${detail}`)
    }

    const data = (await response.json()) as CloudinaryResourcesResponse
    const resources = Array.isArray(data.resources) ? data.resources : []

    for (const resource of resources) {
      if (!resource.secure_url) {
        continue
      }

      if (resource.asset_folder && resource.asset_folder !== normalizedFolderPath) {
        continue
      }

      images.push({
        alt: getImageAlt(resource),
        id: resource.asset_id ?? resource.public_id,
        src: resource.secure_url,
      })
    }

    nextCursor = data.next_cursor
  } while (nextCursor)

  return images
}
