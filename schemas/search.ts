import { z } from 'zod'

export const SearchResultSchema = z.object({
  status: z.number(),
  timestamp: z.string(),
  message: z.string(),
  results: z.array(
    z.object({
      collection: z.string(),
      documents: z.array(z.any()),
    })
  ),
  query: z.object({
    searchTerms: z.array(z.string()),
    fields: z.array(z.string()),
    locale: z.string(),
    collections: z.array(z.string()),
    logicOperator: z.string(),
  }),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
  }),
})
