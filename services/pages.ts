import { INVALIDATE_INTERVAL } from '@/constants'
const populateOptions = 'content.photos,content.buttons,content.image,thumbnail'

export async function getSinglePage(locale: string, slug: string): Promise<ApiResponse> {
    const res = await fetch(`${process.env.STRAPI_URL}/pages/${slug}?locale=${locale}&populate=${populateOptions}`, { next: { revalidate: INVALIDATE_INTERVAL } });
    return res.json();
}

export async function getPageByType(pageType: string, locale: string, slug: string): Promise<ApiResponse> {
    const res = await fetch(`${process.env.API_URL}/${pageType}/${locale}/${slug}`, { next: { revalidate: INVALIDATE_INTERVAL } });
    return res.json();
}

export async function getDataByType(type: string): Promise<any> {
    const res = await fetch(`${process.env.API_URL}/${type}`, { next: { revalidate: INVALIDATE_INTERVAL } });
    return res.json();
}

export async function getDataById(type: string, id: string): Promise<any> {
    const res = await fetch(`${process.env.API_URL}/${type}/id/${id}`, { next: { revalidate: INVALIDATE_INTERVAL } });
    return res.json();
}

export async function getContentByType(type: string, locale: string): Promise<ApiResponse> {
    const res = await fetch(`${process.env.STRAPI_URL}/${type}?locale=${locale}&populate=${populateOptions}`, { next: { revalidate: INVALIDATE_INTERVAL } });
    return res.json();
}
