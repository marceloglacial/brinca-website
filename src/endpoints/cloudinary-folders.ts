import type { Endpoint } from 'payload'

export const cloudinaryFoldersEndpoint: Endpoint = {
  path: '/cloudinary-folders',
  method: 'get',
  handler: async (req) => {
    const cloud = process.env.CLOUDINARY_CLOUD_NAME
    const key = process.env.CLOUDINARY_API_KEY
    const secret = process.env.CLOUDINARY_API_SECRET

    if (!cloud || !key || !secret) {
      return Response.json({ message: 'Cloudinary not configured on server' }, { status: 501 })
    }

    // Parse prefix from incoming request URL. Default root is 'eventos'.
    const requestUrl = typeof req?.url === 'string' ? new URL(req.url, 'http://localhost') : null
    const clientPrefix = requestUrl?.searchParams.get('prefix') || ''
    const root = 'eventos'
    const finalPrefix = clientPrefix ? `${root}/${clientPrefix}` : root

    const apiUrl = new URL(`https://api.cloudinary.com/v1_1/${cloud}/folders`)
    apiUrl.searchParams.set('prefix', finalPrefix)

    const auth = 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64')

    const resp = await fetch(apiUrl.toString(), { headers: { Authorization: auth } })

    if (!resp.ok) {
      const text = await resp.text().catch(() => '')
      return Response.json(
        { message: 'Cloudinary API error', detail: text },
        { status: resp.status },
      )
    }

    const json = await resp.json().catch(() => ({}))
    const folders = Array.isArray(json.folders) ? json.folders.map((f: any) => f.name) : []

    return Response.json({ folders })
  },
}
