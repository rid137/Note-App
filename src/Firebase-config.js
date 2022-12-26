import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA-GEYqrZSBh7Wg2nDPJ9iCBY9oN7XLb8Q",
  authDomain: "my-note-app-e9554.firebaseapp.com",
  projectId: "my-note-app-e9554",
  storageBucket: "my-note-app-e9554.appspot.com",
  messagingSenderId: "514500825765",
  appId: "1:514500825765:web:59c257c827afdd7559734c"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);