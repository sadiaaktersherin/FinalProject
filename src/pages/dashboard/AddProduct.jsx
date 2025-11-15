import React, { useState } from "react";
import { db, auth } from "../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    resalePrice: "",
    originalPrice: "",
    condition: "excellent",
    mobile: "",
    location: "",
    category: "electronics",
    description: "",
    yearOfPurchase: "",
    status: "available",
  });
  const [loading, setLoading] = useState(false);
  const [bulkCount, setBulkCount] = useState(1); // for bulk adding

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (let i = 1; i <= bulkCount; i++) {
        await addDoc(collection(db, "products"), {
          ...form,
          name: `${form.name} ${i}`, // unique name for bulk
          sellerUid: auth.currentUser.uid,
          sellerName: auth.currentUser.displayName,
          createdAt: serverTimestamp(),
        });
      }
      alert(`✅ ${bulkCount} Product(s) added successfully!`);
      setForm({
        name: "",
        resalePrice: "",
        originalPrice: "",
        condition: "excellent",
        mobile: "",
        location: "",
        category: "electronics",
        description: "",
        yearOfPurchase: "",
        status: "available",
      });
      setBulkCount(1);
    } catch (error) {
      console.error("Add product failed:", error);
      alert("❌ Failed to add product(s).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form className="flex flex-col gap-2 max-w-md" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="resalePrice"
          placeholder="Resale Price"
          value={form.resalePrice}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={form.originalPrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="yearOfPurchase"
          placeholder="Year of Purchase"
          value={form.yearOfPurchase}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Bulk Add Count */}
        <input
          type="number"
          min={1}
          max={50}
          value={bulkCount}
          onChange={(e) => setBulkCount(Number(e.target.value))}
          className="border p-2 rounded"
          placeholder="Number of products to add"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Adding..." : "Add Product(s)"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;