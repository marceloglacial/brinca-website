import { COLLECTIONS } from '@/constants'
import { ApiResponseSchema, HttpStatusSchema, ParamsSchema } from '@/schemas/api'
import { CollectionKey, GetDataParams, NewApiResponse } from '@/types/new-api'

const customFetch = async (baseUrl: string, params: GetDataParams): Promise<NewApiResponse> => {
  try {
    ParamsSchema.parse(params)

    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })
    const url = `${baseUrl}${searchParams.toString() ? '?' + searchParams.toString() : ''}`
    const response = await fetch(url, {
      headers: new Headers({
        'x-api-key': process.env.API_KEY!,
        'Content-Type': 'application/json',
      }),
    })
    const data = await response.json()

    return ApiResponseSchema.parse(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const getAllByCollection = async (collection: CollectionKey, params: GetDataParams) => {
  const baseUrl = `${process.env.API_URL!}/${collection}`
  return await customFetch(baseUrl, params)
}

export const getPageBySlug = async (
  collection: CollectionKey,
  slug: string,
  params: GetDataParams
) => {
  const baseUrl = `${process.env.API_URL!}/${collection}/slug/${slug}`
  return await customFetch(baseUrl, params)
}

export const getLocales = async () => {
  const baseUrl = `${process.env.API_URL!}/${COLLECTIONS.LOCALES}`
  const response = await customFetch(baseUrl, {})

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST || !response.data) {
    return []
  }

  return response.data
}
