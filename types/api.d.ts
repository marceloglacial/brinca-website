interface IResponse {
    status: 'success' | 'error',
    message: string,
    id?: string | number
    error?: Error | unknown
    data?: any
}

interface IPageResponse extends IResponse {
    total?: number
    data: IPageData
}
