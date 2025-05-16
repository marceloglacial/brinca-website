import { COLLECTIONS } from '@/constants'
import { ApiResponseSchema, ParamsSchema, HttpStatusSchema, PaginationSchema } from '@/schemas/api'
import { CollectionSchema, TimestampSchema } from '@/schemas/collections'
import { SearchResultSchema } from '@/schemas/search'
import { z } from 'zod'

// Api
export type NewApiResponse = z.infer<typeof ApiResponseSchema>
export type GetDataParams = z.infer<typeof ParamsSchema>
export type HttpStatus = z.infer<typeof HttpStatusSchema>
export type Pagination = z.infer<typeof PaginationSchema>

// Components
export type Collection = z.infer<typeof CollectionSchema>
export type CollectionKey = (typeof COLLECTIONS)[keyof typeof COLLECTIONS]
export type Block = Collection['blocks']
export type Timestamp = z.infer<typeof TimestampSchema>

// Search
export type SearchResultsType = z.infer<typeof SearchResultSchema>
