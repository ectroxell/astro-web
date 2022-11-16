import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyDf6W8tb_c2bixbgC-5vcVsvgkUM3LWMJc',
  authDomain: 'astro-react-c12a5.firebaseapp.com',
  projectId: 'astro-react-c12a5',
  storageBucket: 'astro-react-c12a5.appspot.com',
  messagingSenderId: '217366656751',
  appId: '1:217366656751:web:008a7e61f64382d44c4d1a',
  measurementId: 'G-ZY653BQKF3',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);

