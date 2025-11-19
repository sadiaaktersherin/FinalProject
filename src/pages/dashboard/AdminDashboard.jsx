import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import "./AdminDashboard.css"; // <--- Plain CSS file

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
    setProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifySeller = async (sellerId) => {
    await updateDoc(doc(db, "users", sellerId), { verified: true });
    fetchData();
    alert("Seller Verified!");
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Delete this user?")) {
      await deleteDoc(doc(db, "users", userId));
      fetchData();
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Delete this product?")) {
      await deleteDoc(doc(db, "products", productId));
      fetchData();
    }
  };

  if (loading) return <p className="loading-text">Loading admin data...</p>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* Sellers */}
      <h3 className="section-title">All Sellers</h3>
      <div className="list-container">
        {sellers.map(s => (
          <div key={s.id} className="item-card">
            <span className="item-name">
              {s.name}
              {s.verified && <span className="verified-badge">✔ Verified</span>}
            </span>

            <div className="action-buttons">
              {!s.verified && (
                <button 
                  onClick={() => handleVerifySeller(s.id)} 
                  className="btn verify-btn"
                >
                  Verify
                </button>
              )}

              <button 
                onClick={() => handleDeleteUser(s.id)} 
                className="btn delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Buyers */}
      <h3 className="section-title">All Buyers</h3>
      <div className="list-container">
        {buyers.map(b => (
          <div key={b.id} className="item-card">
            <span className="item-name">{b.name}</span>

            <button 
              onClick={() => handleDeleteUser(b.id)} 
              className="btn delete-btn"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Products */}
      <h3 className="section-title">All Products</h3>
      <div className="list-container">
        {products.map(p => (
          <div key={p.id} className="item-card">
            <span className="item-name">
              {p.name} - ${p.resalePrice}
              <small className="seller-small">Seller: {p.sellerName}</small>
            </span>

            <button 
              onClick={() => handleDeleteProduct(p.id)} 
              className="btn delete-btn"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;
