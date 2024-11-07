import { COLLECTIONS } from '@/constants';
import { getCollectionById } from './firebase';
import { localizedData } from '@/utils';

export const getMenus = async (locale: string): Promise<ApiResponse<MenusType>> => {
    try {
        const result = await getCollectionById(COLLECTIONS.MENUS);
        return {
            ...result,
            data: localizedData(result.data, locale),
        }
    } catch (e) {
        console.error(e)
        throw Error
    }
}
