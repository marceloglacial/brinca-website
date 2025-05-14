import { SITE } from '@/constants'
import { getApp, getApps, initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
  DocumentData,
  OrderByDirection,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Define missing types
export type OrderType = OrderByDirection // 'asc' | 'desc'

export interface ApiResponseMeta {
  totalCount: number
  page: number
  pageSize: number
  hasNextPage: boolean
}

export interface ApiResponse<T> {
  status: 'success' | 'error'
  message: string
  data: T | null
  meta: ApiResponseMeta
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Define a base document type that all Firestore documents will have
export interface FirestoreDocument extends DocumentData {
  id: string
}

export const storage = getStorage(app)
export const db = getFirestore(app)

export const getDocumentById = async <T extends FirestoreDocument = FirestoreDocument>(
  collectionId: string,
  docId: string
): Promise<ApiResponse<T>> => {
  try {
    const docRef = doc(db, collectionId, docId)
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
      return {
        status: 'success',
        message: 'Success',
        data: { id: docSnapshot.id, ...docSnapshot.data() } as T,
        meta: {
          totalCount: 0,
          page: 0,
          pageSize: 0,
          hasNextPage: false,
        },
      }
    } else {
      return {
        status: 'error',
        message: 'Document not found',
        data: null,
        meta: {
          totalCount: 0,
          page: 0,
          pageSize: 0,
          hasNextPage: false,
        },
      }
    }
  } catch (e) {
    console.error(e)
    return {
      status: 'error',
      message: 'Error retrieving document',
      data: null,
      meta: {
        totalCount: 0,
        page: 0,
        pageSize: 0,
        hasNextPage: false,
      },
    }
  }
}

export const getDocumentBySlug = async <T extends FirestoreDocument = FirestoreDocument>(
  collectionId: string,
  slug: string,
  locale?: string
): Promise<ApiResponse<T>> => {
  try {
    const collectionRef = collection(db, collectionId)
    const slugField = `slug.${locale || SITE.DEFAULT_LOCALE}`
    const q = query(collectionRef, where(slugField, '==', slug))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0] // Assuming only one document per slug
      return {
        message: 'Success',
        status: 'success',
        data: { id: docData?.id, ...docData?.data() } as T,
        meta: {
          totalCount: querySnapshot.size,
          page: 0,
          pageSize: 1,
          hasNextPage: false,
        },
      }
    } else {
      return {
        status: 'error',
        message: 'Document not found',
        data: null,
        meta: {
          totalCount: 0,
          page: 0,
          pageSize: 0,
          hasNextPage: false,
        },
      }
    }
  } catch (e) {
    console.error(e)
    return {
      status: 'error',
      message: 'Error retrieving document',
      data: null,
      meta: {
        totalCount: 0,
        page: 0,
        pageSize: 0,
        hasNextPage: false,
      },
    }
  }
}

export const addDocument = async <T extends FirestoreDocument = FirestoreDocument>(
  collectionId: string,
  data: Omit<T, 'id'>
): Promise<ApiResponse<T>> => {
  try {
    const docRef = await addDoc(collection(db, collectionId), data)
    return {
      status: 'success',
      message: 'Document added successfully',
      data: { id: docRef.id, ...data } as T,
      meta: {
        totalCount: 0,
        page: 0,
        pageSize: 0,
        hasNextPage: false,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      status: 'error',
      message: 'Error adding document',
      data: null,
      meta: {
        totalCount: 0,
        page: 0,
        pageSize: 0,
        hasNextPage: false,
      },
    }
  }
}
