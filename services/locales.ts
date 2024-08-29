import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants';

export async function getLocales(): Promise<ApiLocalesResponse> {
    try {
        const res = await fetch(`${process.env.API_URL}/${COLLECTIONS.LOCALE}`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}
