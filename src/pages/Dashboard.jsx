import React, { useEffect, useState } from "react";

const MyProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Phone", price: 200 },
  ]); // Placeholder products

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      alert("✅ Product deleted!");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Products</h2>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border p-2 rounded shadow">
              <h3 className="font-bold">{p.name}</h3>
              <p>Price: ${p.price}</p>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white p-1 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;