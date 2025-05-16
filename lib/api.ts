import { COLLECTIONS } from '@/constants'
import { ApiResponseSchema, ParamsSchema } from '@/schemas/api'
import { GetDataParams, NewApiResponse } from '@/types/new-api'

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

export const getAllPages = async () => {
  const baseUrl = `${process.env.API_URL!}/${COLLECTIONS.PAGES}/`
  return customFetch(baseUrl, {})
}

export const getPageBySlug = async (slug: string, params: GetDataParams) => {
  const baseUrl = `${process.env.API_URL!}/${COLLECTIONS.PAGES}/slug/${slug}/`
  const response = await customFetch(baseUrl, params)
  return { ...response, data: response.data[0] }
}
