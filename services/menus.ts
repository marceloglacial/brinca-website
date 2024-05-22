import db from "@/config/firestore"
import { collection, getDocs } from "firebase/firestore"

export interface MenuProps {
    status: 'success' | 'error'
    data: any
    error?: any
}

export const getMenus = async (): Promise<MenuProps> => {
    try {
        const allDocs = await getDocs(collection(db, "menus"))
        return {
            status: 'success',
            data: allDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        }
    } catch (e) {
        return {
            status: 'error',
            error: e,
            data: []
        }
    }
}
