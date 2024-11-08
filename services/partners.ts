import { COLLECTIONS } from '@/constants';
import { db } from '@/services';
import { collection, query, orderBy, limit, getDocs, startAfter, where } from '@firebase/firestore';

export const getPartners = async ({
    order,
    page = 1,
    pageSize = 100,
    type = 'partners',
}: {
    order?: string;
    page?: number;
    pageSize?: number;
    type?: 'partners' | 'community';
} = {}): Promise<ApiResponse<PartnerTypeLocalized[]>> => {
    try {
        const collectionRef = collection(db, COLLECTIONS.PARTNERS);
        let orderedQuery = order ? query(collectionRef, orderBy(order)) : collectionRef;

        orderedQuery = query(
            orderedQuery,
            where('active', '==', true),
            where('has_membership', type === 'partners' ? '!=' : '==', ' ')
        );

        let paginatedQuery = query(orderedQuery, limit(pageSize));

        if (page > 1) {
            // Retrieve the last document of the previous page
            const previousPageQuery = query(orderedQuery, limit((page - 1) * pageSize));
            const previousPageSnapshot = await getDocs(previousPageQuery);

            if (!previousPageSnapshot.empty) {
                const lastVisible = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
                paginatedQuery = query(orderedQuery, startAfter(lastVisible), limit(pageSize));
            }
        }

        const querySnapshot = await getDocs(paginatedQuery);

        const allDocs = querySnapshot.docs.map((doc) => ({
            ...(doc.data() as PartnerTypeLocalized),
            id: doc?.id,
        }));

        const totalCount = (await getDocs(orderedQuery)).size;
        const hasNextPage = totalCount > page * pageSize;

        return {
            status: 'success',
            message: 'Success',
            meta: {
                totalCount,
                page,
                pageSize,
                hasNextPage,
            },
            data: allDocs,
        };
    } catch (error) {
        return {
            status: 'error',
            message: (error as Error).message,
            meta: {
                totalCount: 0,
                page,
                pageSize,
                hasNextPage: false,
            },
            data: [],
        };
    }
};
