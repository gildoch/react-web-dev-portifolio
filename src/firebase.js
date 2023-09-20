
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDhwgZDFf4W-aT3iX0mqO6uE5hkh5d7AoY",
  authDomain: "react-portifolio-dashboa-a7b21.firebaseapp.com",
  projectId: "react-portifolio-dashboa-a7b21",
  storageBucket: "react-portifolio-dashboa-a7b21.appspot.com",
  messagingSenderId: "674375584951",
  appId: "1:674375584951:web:ec320f8e32276241365132"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);


export const signInWithGoogle = () => signInWithPopup(auth, provider);