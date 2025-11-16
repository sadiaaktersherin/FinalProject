import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3nylf4O-K6CDcCEK46pGhIHxSgFFSZW0",
  authDomain: "sadiasfinalproject.firebaseapp.com",
  projectId: "sadiasfinalproject",
  storageBucket: "sadiasfinalproject.appspot.com",
  messagingSenderId: "726215483888",
  appId: "1:726215483888:web:bf2298ec8c91311ecebd35",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
