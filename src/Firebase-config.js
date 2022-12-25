import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAVkCjhrw7QqYXgYyRf5sQ4eC8szyF9Qfw",
  authDomain: "new-note-app-dfd7c.firebaseapp.com",
  projectId: "new-note-app-dfd7c",
  storageBucket: "new-note-app-dfd7c.appspot.com",
  messagingSenderId: "453679516387",
  appId: "1:453679516387:web:3495671fa64a913d4a93d6"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);