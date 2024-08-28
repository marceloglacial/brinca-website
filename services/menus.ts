import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants';

export async function getMenu(locale: LocaleTypes): Promise<ApiListResponse> {
    try {
        const res = await fetch(`${process.env.STRAPI_URL}/${COLLECTIONS.MENU}?locale=${locale}&populate=*`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}
