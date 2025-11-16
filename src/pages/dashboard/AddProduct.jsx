import React, { useState, useEffect } from "react";
import { auth, db } from "../../services/firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const categories = ["Electronics", "Clothing", "Books", "Furniture", "Accessories"];
const locations = ["Chittagong", "Dhaka", "Khulna", "Rajshahi", "Sylhet", "Barisal"];

const AddProduct = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [sellerVerified, setSellerVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    resalePrice: "",
    originalPrice: "",
    condition: "excellent",
    mobile: "",
    location: "Chittagong",
    category: "Electronics",
    description: "",
    yearOfPurchase: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkSeller = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setSellerVerified(docSnap.data().verified);
      }
    };
    checkSeller();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sellerVerified) {
      alert("You must be a verified seller to add products.");
      return;
    }
    try {
      setLoadingSubmit(true);
      await addDoc(collection(db, "products"), {
        ...formData,
        sellerId: user.uid,
        sellerName: user.displayName,
        sellerVerified: true,
        createdAt: new Date(),
      });
      setMessage("Product added successfully!");
      setTimeout(() => {
        setMessage("");
        navigate("/dashboard/my-products");
      }, 1500);
    } catch (err) {
      alert("Error adding product: " + err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in to add products.</p>;

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" required onChange={handleChange} />
        <input type="number" name="resalePrice" placeholder="Resale Price" required onChange={handleChange} />
        <input type="number" name="originalPrice" placeholder="Original Price" required onChange={handleChange} />
        <select name="condition" value={formData.condition} onChange={handleChange}>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
        <input type="text" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
        <select name="location" value={formData.location} onChange={handleChange}>
          {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <select name="category" value={formData.category} onChange={handleChange}>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="text" name="yearOfPurchase" placeholder="Year of Purchase" required onChange={handleChange} />
        <textarea name="description" placeholder="Description" required onChange={handleChange}></textarea>
        <button type="submit" disabled={loadingSubmit}>
          {loadingSubmit ? "Submitting..." : "Add Product"}
        </button>
      </form>
      {message && <div className="toast">{message}</div>}
    </div>
  );
};

export default AddProduct;
