import db from "@/config/firestore"
import { Timestamp, collection, getDocs, query, where } from "firebase/firestore"

export interface PageDocumentData {
    createdAt?: Timestamp;
    title?: string;
    content: string;
    updatedAt?: Timestamp;
    slug: string;
    publishedAt?: Timestamp;
    locale: string;
    id: string;
    parent?: PageParamsProps['slug']
    image?: HTMLImageElement
}


export interface DataResponseProps {
    status: 'success' | 'error'
    data: PageDocumentData[]
    error?: any
}

export const getData = async (page: string, slug?: string, locale?: string): Promise<DataResponseProps> => {
    try {
        const data: any = await fetch(`http://localhost:3007/api/${page}/${locale}/${slug}`)
        return {
            status: 'success',
            data: data.json()
        }
    } catch (e) {
        throw (e);
    }
};
