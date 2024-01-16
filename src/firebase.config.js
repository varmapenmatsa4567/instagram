// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsAGasuSrRCSP0GPox4O6mtxJnBui5znI",
  authDomain: "instagram-pcv.firebaseapp.com",
  projectId: "instagram-pcv",
  storageBucket: "instagram-pcv.appspot.com",
  messagingSenderId: "448661975425",
  appId: "1:448661975425:web:4af4c47926319394287880"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);