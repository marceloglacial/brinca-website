import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants'
import { getCollectionById, getDocumentBySlug } from './firebase';
import { localizedContent } from '@/utils';
import { unstable_cache } from 'next/cache';

export const getSingleEvent = unstable_cache(
    async (collection: string, slug: string, locale: string): Promise<ApiResponse<ContentType>> => {
        try {
            const result = await getDocumentBySlug(collection, slug, locale);
            return {
                ...result,
                data: localizedContent(result.data, locale),
            }
        } catch (e) {
            console.error(e)
            throw Error
        }
    },
    ['single-event'],
    { revalidate: INVALIDATE_INTERVAL }
);

export const getEvents = unstable_cache(
    async (): Promise<ApiResponse<EventType[]>> => {
        try {
            const result = await getCollectionById(COLLECTIONS.EVENTS);
            return {
                ...result,
                data: result.data,
            }
        } catch (e) {
            console.error(e)
            throw Error
        }
    },
    ['event-by-slug'],
    { revalidate: INVALIDATE_INTERVAL }
);
