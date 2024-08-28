import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants'

export async function getSinglePage(locale: string, slug: string): Promise<ApiResponse> {
    try {
        const res = await fetch(`${process.env.STRAPI_URL}/pages/${slug}?locale=${locale}&populate[content][populate]=*`, { next: { revalidate: INVALIDATE_INTERVAL } });
        if (!res) throw Error
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
        const populateQuery = `&populate=*`
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
        const res = await fetch(`${process.env.STRAPI_URL}/${COLLECTIONS.HOMEPAGE}?locale=${locale}&populate[frontpage][populate]=*`, { next: { revalidate: INVALIDATE_INTERVAL } });
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
        const res = await fetch(`${process.env.STRAPI_URL}/${type}/${slug}?locale=${locale}&populate[content][populate]=*`, { next: { revalidate: INVALIDATE_INTERVAL } });
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
        const res = await fetch(`${process.env.STRAPI_URL}/${type}/${id}?locale=${locale}&populate=*`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}
