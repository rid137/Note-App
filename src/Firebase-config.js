import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBGe_aAJqLt8YxToR6_anAasc2qtFDgbVE",
  authDomain: "my-note-app-e52a0.firebaseapp.com",
  projectId: "my-note-app-e52a0",
  storageBucket: "my-note-app-e52a0.appspot.com",
  messagingSenderId: "118394705337",
  appId: "1:118394705337:web:1494cbc81bcd9b56a69268",
  measurementId: "G-TYRWH7WWE4"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

