// src/services/productService.js
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchProductsByCategory = async (categoryId) => {
  const q = query(
    collection(db, "products"),
    where("category", "==", categoryId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};