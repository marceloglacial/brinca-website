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

export const getAllPages = async () => {
  const baseUrl = `${process.env.API_URL!}/${COLLECTIONS.PAGES}`
  return customFetch(baseUrl, {})
}

export const getPageBySlug = async (slug: string, params: GetDataParams) => {
  const baseUrl = `${process.env.API_URL!}/${COLLECTIONS.PAGES}/slug/${slug}`
  const response = await customFetch(baseUrl, params)
  return { ...response, data: response.data[0] }
}

export const getMenus = async (params: GetDataParams): Promise<MenuItemType[]> => {
  const baseUrl = `${process.env.API_URL!}/${COLLECTIONS.MENUS}`
  const response = await customFetch(baseUrl, params)

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST || !response.data) {
    return []
  }

  return (response.data[0]?.items ?? []) as MenuItemType[]
}

export const getLocales = async () => {
  const baseUrl = `${process.env.API_URL!}/${COLLECTIONS.LOCALES}`
  const response = await customFetch(baseUrl, {})

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST || !response.data) {
    return []
  }

  return response.data
}

export const getSingleData = async (slug: CollectionKey, id: string, params: GetDataParams) => {
  const baseUrl = `${process.env.API_URL!}/${slug}/slug/${id}`
  return await customFetch(baseUrl, params)
}
