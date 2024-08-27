import { INVALIDATE_INTERVAL } from '@/constants'
// const populateOptions = 'content.photos,content.buttons,content.image,thumbnail,category,logo'
const populateOptions = '*'

export async function getSinglePage(locale: string, slug: string): Promise<ApiResponse> {
    try {
        const res = await fetch(`${process.env.STRAPI_URL}/pages/${slug}?locale=${locale}&populate=${populateOptions}`, { next: { revalidate: INVALIDATE_INTERVAL } });
        if (!res) throw Error
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}

export async function getPageByType(pageType: string, locale: string, slug: string): Promise<ApiResponse> {
    try {
        const res = await fetch(`${process.env.API_URL}/${pageType}/${locale}/${slug}`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}

export async function getDataByType(type: string): Promise<any> {
    try {
        const res = await fetch(`${process.env.API_URL}/${type}`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}

export async function getDataById(type: string, id: string): Promise<any> {
    try {
        const res = await fetch(`${process.env.API_URL}/${type}/id/${id}`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}

export async function getContentByType(type: string, locale: string, pageSize?: number, sort?: string, order?: 'asc' | 'desc', filter?: string): Promise<ApiListResponse> {
    try {
        const sortQuery = sort ? `&sort[0]=${sort}` : ''
        const orderQuery = order ? `:${order}` : ''
        const paginationQuery = pageSize ? `&pagination[pageSize]=${pageSize || 100}` : ''
        const populateQuery = `&populate=${populateOptions}`
        const filterQyery = filter ? `&filters${filter}` : ''
        const res = await fetch(`${process.env.STRAPI_URL}/${type}?locale=${locale}${populateQuery}${paginationQuery}${sortQuery}${orderQuery}${filterQyery}`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}

export async function getHomePage(locale: string): Promise<ApiListResponse> {
    try {
        const res = await fetch(`${process.env.STRAPI_URL}/homepage?locale=${locale}&populate=frontpage.image,frontpage.button`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}

export async function getContentBySlug(type: string, slug: string, locale: string): Promise<ApiListResponse> {
    try {
        const res = await fetch(`${process.env.STRAPI_URL}/${type}/${slug}?locale=${locale}&populate=${populateOptions}`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}

export async function getContentById(type: string, id: string, locale: string): Promise<ApiListResponse> {
    try {
        const res = await fetch(`${process.env.STRAPI_URL}/${type}/${id}?locale=${locale}&populate=${populateOptions}`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}
