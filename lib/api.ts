import { COLLECTIONS } from '@/constants'
import { ApiResponse, CollectionKey, GetDataParams } from '@/types'
import { ApiResponseSchema, ParamsSchema } from '@/schemas/api'

const customFetch = async (baseUrl: string, params: GetDataParams): Promise<ApiResponse> => {
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

export const getAllPages = async () => {
  const baseUrl = `${process.env.API_URL!}/${COLLECTIONS.PAGES}/`
  return customFetch(baseUrl, {})
}

export const getPageBySlug = async (slug: string, params: GetDataParams) => {
  const baseUrl = `${process.env.API_URL!}/${COLLECTIONS.PAGES}/slug/${slug}/`
  return customFetch(baseUrl, params)
}

export const getPageById = async (id: string, params: GetDataParams) => {
  const baseUrl = `${process.env.API_URL!}/${COLLECTIONS.PAGES}/${id}`
  return customFetch(baseUrl, params)
}

export const getCollection = async (collection: CollectionKey, params: GetDataParams) => {
  const baseUrl = `${process.env.API_URL!}/${collection}/`
  return customFetch(baseUrl, params)
}

export const getCollectionById = async (
  collection: CollectionKey,
  id: string,
  params: GetDataParams
) => {
  const baseUrl = `${process.env.API_URL!}/${collection}/${id}`
  return customFetch(baseUrl, params)
}

export const getCategories = async () => {
  return getCollection(COLLECTIONS.CATEGORIES, { locale: 'pt_br', sortBy: 'title' })
}
