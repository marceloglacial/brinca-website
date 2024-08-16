interface ApiError {
    error: {
        status: number;
        name: string;
        message: string;
        details?: any;
    };
}

interface ApiResult {
    data: {
        id: number;
        attributes: any;
    };
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
