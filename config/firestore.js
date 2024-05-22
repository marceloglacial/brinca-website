import { getFirestore } from 'firebase/firestore';
import firebaseApp from './firebaseConfig';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';

export const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
export default db;
