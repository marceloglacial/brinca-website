import db from "@/config/firestore"
import { Timestamp, collection, getDocs, query, where } from "firebase/firestore"

export interface PageDocumentData {
    createdAt: Timestamp;
    title: string;
    content: string;
    updatedAt: Timestamp;
    slug: string;
    publishedAt: Timestamp;
    locale: string;
    id: string;
}


export interface DataResponseProps {
    status: 'success' | 'error'
    data: any
    error?: any
}

export const getData = async (collectionName: string, slug?: string, locale?: string): Promise<DataResponseProps> => {
    try {
        const colRef = collection(db, collectionName);
        let q;

        if (slug) {
            q = query(colRef, where("slug", "==", slug));
        } else if (locale) {
            q = query(colRef, where("locale", "==", locale));
        } else {
            q = query(colRef);
        }

        const querySnapshot = await getDocs(q);
        const results: PageDocumentData[] = querySnapshot.docs.map(doc => ({
            ...(doc.data() as PageDocumentData),
            id: doc.id
        }));

        return {
            status: 'success',
            data: slug ? results[0] : results
        };
    } catch (e) {
        throw (e);
    }
};
