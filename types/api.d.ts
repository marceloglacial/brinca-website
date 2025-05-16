interface IResponse {
  status: 'success' | 'error'
  message: string
  id?: string | number
  error?: Error | unknown
  data?: any
}

interface IPageResponse extends IResponse {
  total?: number
  data: IPageData
}

type Meta = {
  totalCount: number
  page: number
  pageSize: number
  hasNextPage: boolean
}

/** @deprecated */
type ApiResponse<T> = {
  data: T
  status: 'success' | 'error'
  message: string
  meta: Meta
}

type OrderType = 'asc' | 'desc'
