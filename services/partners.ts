import { COLLECTIONS } from '@/constants';
import { getCollectionById } from '@/services';

export async function getPartners(): Promise<ApiResponse<PartnerTypeLocalized[]>> {
    try {
        const result = await getCollectionById(COLLECTIONS.PARTNERS);
        return {
            ...result,
            data: result.data,
        }
    } catch (e) {
        console.error(e)
        throw Error
    }
}
