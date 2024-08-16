interface ApiError {
    error: {
        status: number;
        name: string;
        message: string;
        details?: any;
    };
}

type ApiDataType = {
    id: number;
    attributes: any;
}

interface ApiResult {
    data: ApiDataType;
    meta?: any;
}

type ApiResponse = ApiResult | ApiError;

interface FormatedData {
    id: number,
    title: string,
    slug: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    locale: string,
    content: any,
    thumbnail?: any
}


interface ApiListResult {
    data: ApiDataType[]
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}

type ApiListResponse = ApiListResult | ApiError
