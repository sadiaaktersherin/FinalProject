import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyD3nylf4O-K6CDcCEK46pGhIHxSgFFSZW0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "sadiasfinalproject.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "sadiasfinalproject",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "sadiasfinalproject.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "726215483888",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:726215483888:web:4f1fb6a55dd680e7cebd35",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;