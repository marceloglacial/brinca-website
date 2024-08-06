import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants'

export async function getSinglePage(locale: string, slug: string): Promise<IPageResponse> {
    const res = await fetch(`${process.env.API_URL}/${COLLECTIONS.PAGES}/${locale}/${slug}`, { next: { revalidate: INVALIDATE_INTERVAL } });
    return res.json();
}

export async function getPageByType(pageType: string, locale: string, slug: string): Promise<IPageResponse> {
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
