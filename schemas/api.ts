import { z } from 'zod'
import { CollectionSchema } from './collections'

const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

export const HttpStatusSchema = z.nativeEnum(HttpStatus)

export const PaginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  pages: z.number().optional(),
})

export const ParamsSchema = z.object({
  limit: z.number().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  locale: z.enum(['pt_br', 'en']).optional(),
  publishedAt: z.union([z.date(), z.string()]).optional(),
  createdAt: z.union([z.date(), z.string()]).optional(),
  active: z.boolean().optional(),
})

export const ApiResponseSchema = z.object({
  status: HttpStatusSchema,
  timestamp: z.coerce.date(),
  message: z.string(),
  pagination: PaginationSchema.optional(),
  data: z.preprocess(
    (val) => (Array.isArray(val) ? val : val ? [val] : []),
    z.array(CollectionSchema)
  ),
  error: z.string().optional(),
  documentId: z.string().optional(),
})
