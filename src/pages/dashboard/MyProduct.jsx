// src/pages/dashboard/MyProducts.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../../services/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const q = query(collection(db, "products"), where("sellerUid", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
      alert("✅ Product deleted!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading products...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.length === 0 && <p>No products added yet.</p>}
        {products.map((p) => (
          <div key={p.id} className="border p-2 rounded shadow">
            <h3 className="font-bold">{p.name}</h3>
            <p>Resale Price: ${p.resalePrice}</p>
            <p>Original Price: ${p.originalPrice}</p>
            <p>Status: {p.status}</p>
            <p>Category: {p.category}</p>
            <p>Location: {p.location}</p>
            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 text-white p-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;