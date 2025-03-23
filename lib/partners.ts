import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants'
import { db, getCollectionById } from '@/lib'
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { unstable_cache } from 'next/cache'

export const getPartners = async ({
  order,
  page = 1,
  pageSize = 100,
  type = 'partners',
  category,
}: GetPartnersType = {}): Promise<ApiResponse<PartnerTypeLocalized[]>> => {
  try {
    const cacheKey = `partners-${order}-${page}-${pageSize}-${type}-${category?.id}`

    return await unstable_cache(
      async () => {
        const collectionRef = collection(db, COLLECTIONS.PARTNERS)
        let orderedQuery = order ? query(collectionRef, orderBy(order)) : collectionRef

        orderedQuery = query(
          orderedQuery,
          where('active', '==', true),
          where('membership_email', type === 'partners' ? '!=' : '==', '')
        )

        if (category) {
          orderedQuery = query(orderedQuery, where('category', '==', category.id))
        }

        let paginatedQuery = query(orderedQuery, limit(pageSize))

        if (page > 1) {
          const previousPageQuery = query(orderedQuery, limit((page - 1) * pageSize))
          const previousPageSnapshot = await getDocs(previousPageQuery)

          if (!previousPageSnapshot.empty) {
            const lastVisible = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1]
            paginatedQuery = query(orderedQuery, startAfter(lastVisible), limit(pageSize))
          }
        }

        const querySnapshot = await getDocs(paginatedQuery)

        const allDocs = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as PartnerTypeLocalized),
          id: doc.id,
        }))

        // Randomize the order of the results using Fisher-Yates shuffle
        for (let i = allDocs.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[allDocs[i] as any, allDocs[j] as any] = [allDocs[j], allDocs[i]]
        }

        const totalCount = (await getDocs(orderedQuery)).size
        const hasNextPage = totalCount > page * pageSize

        return {
          status: 'success' as const,
          message: 'Success',
          meta: {
            totalCount,
            page,
            pageSize,
            hasNextPage,
          },
          data: allDocs,
        }
      },
      [cacheKey],
      { revalidate: INVALIDATE_INTERVAL }
    )()
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
    }
  }
}

export const getCategories = unstable_cache(
  async (locale: LocalesType = 'pt_br'): Promise<ApiResponse<CategoryType[]>> => {
    try {
      const result = await getCollectionById(COLLECTIONS.CATEGORIES)
      return {
        ...result,
        data: result.data.sort((a, b) => a.title[locale].localeCompare(b.title[locale])),
      }
    } catch (e) {
      console.error(e)
      throw Error
    }
  },
  ['partners-category'],
  { revalidate: INVALIDATE_INTERVAL }
)
