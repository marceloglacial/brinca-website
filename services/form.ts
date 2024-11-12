'use server'
import { unstable_cache } from 'next/cache'
import { getCollectionById, getDocumentById } from './firebase'
import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants'

export const postContent = async (postData: any, collection: string) => {
    const res = await fetch(`${process.env.API_URL}/${collection}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    if (!res.ok) {
        throw new Error('Error')
    }
    const apiData = await res.json()
    return apiData
}


export const getSingleForm = unstable_cache(
    async (id: string): Promise<ApiResponse<FormType>> => {
        try {
            const result = await getDocumentById(COLLECTIONS.FORMS, id);
            return {
                ...result,
                data: result.data,
            }
        } catch (e) {
            console.error(e)
            throw Error
        }
    },
    [`form-single`],
    { revalidate: INVALIDATE_INTERVAL }
);
