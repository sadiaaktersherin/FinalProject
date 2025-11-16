import React, { useState } from "react";
import "./MyProducts.css"; // Add this

const MyProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Phone", price: 200 },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      alert("✅ Product deleted!");
    }
  };

  return (
    <div>
      <h2>My Products</h2>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="product-list">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <h3>{p.name}</h3>
              <p>Price: ${p.price}</p>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
