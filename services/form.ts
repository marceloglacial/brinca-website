import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants';

export async function getFormById(id: string, locale: string): Promise<ApiListResponse> {
    try {
        const res = await fetch(`${process.env.API_URL}/${COLLECTIONS.FORMS}/${id}?locale=${locale}&populate[fields][populate]=*`, { next: { revalidate: INVALIDATE_INTERVAL } });
        return res.json();
    } catch (e) {
        console.error(e);
        return {
            error: e
        } as ApiError
    }
}

export const postContent = async (postData: any, collection: string) => {
    const res = await fetch(`${process.env.API_URL}/${collection}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    if (!res.ok) {
        console.error(res);
        throw new Error('Error')
    }
    const apiData = await res.json()
    return apiData
}
