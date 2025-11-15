import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const AdminDashboard = () => {
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    const usersSnapshot = await getDocs(collection(db, "users"));
    const allUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSellers(allUsers.filter(u => u.userType === "seller"));
    setBuyers(allUsers.filter(u => u.userType === "buyer"));

    const productsSnapshot = await getDocs(collection(db, "products"));
    const allProducts = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(allProducts);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifySeller = async (sellerId) => {
    await updateDoc(doc(db, "users", sellerId), { verified: true });
    fetchData();
    alert("✅ Seller verified!");
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteDoc(doc(db, "users", userId));
      fetchData();
      alert("❌ User deleted!");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", productId));
      fetchData();
      alert("❌ Product deleted!");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading admin data...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Sellers */}
      <h3 className="text-xl font-semibold mt-4">All Sellers</h3>
      <div className="flex flex-col gap-2">
        {sellers.map(s => (
          <div key={s.id} className="border p-2 flex justify-between items-center">
            <span>{s.name} {s.verified && <span className="text-blue-500">✔️</span>}</span>
            <div className="flex gap-2">
              {!s.verified && <button onClick={() => handleVerifySeller(s.id)} className="bg-green-500 text-white p-1 rounded">Verify</button>}
              <button onClick={() => handleDeleteUser(s.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Buyers */}
      <h3 className="text-xl font-semibold mt-4">All Buyers</h3>
      <div className="flex flex-col gap-2">
        {buyers.map(b => (
          <div key={b.id} className="border p-2 flex justify-between items-center">
            <span>{b.name}</span>
            <button onClick={() => handleDeleteUser(b.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </div>
        ))}
      </div>

      {/* Products */}
      <h3 className="text-xl font-semibold mt-4">All Products</h3>
      <div className="flex flex-col gap-2">
        {products.map(p => (
          <div key={p.id} className="border p-2 flex justify-between items-center">
            <span>{p.name} - ${p.resalePrice} ({p.sellerName})</span>
            <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;