// src/pages/CategoryPage.jsx
import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "../services/productService";
import Spinner from "../components/Spinner";
import BookingModal from "../components/BookingModal";
import { auth } from "../services/firebase";
import "./CategoryPage.css"; // 👈 import plain CSS

const CategoryPage = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: productsData = [], isLoading, error } = useQuery(
    ["categoryProducts", id],
    () => fetchProductsByCategory(id)
  );

  // Ensure minimum 50 products (demo)
  const products = useMemo(() => {
    const productsCopy = [...productsData];
    if (productsCopy.length < 50) {
      const fakeCount = 50 - productsCopy.length;
      for (let i = 1; i <= fakeCount; i++) {
        productsCopy.push({
          id: `demo-${i}`,
          name: `Demo Product ${i}`,
          resalePrice: Math.floor(Math.random() * 500) + 50,
          originalPrice: Math.floor(Math.random() * 1000) + 200,
          location: "Demo City",
          yearsOfUse: Math.floor(Math.random() * 5) + 1,
          sellerName: "Demo Seller",
          sellerVerified: true,
          imageUrl: `https://source.unsplash.com/400x400/?${id},product,${i}`,
          fake: true,
        });
      }
    }
    return productsCopy;
  }, [productsData, id]);

  if (isLoading) return <Spinner />;
  if (error)
    return <p className="error-text">Error loading products</p>;

  return (
    <div className="category-page">
      <h2 className="category-title">Category: {id}</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-img"
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="price-row">
                <p className="resale-price">${product.resalePrice}</p>
                <p className="original-price">${product.originalPrice}</p>
              </div>
              <p className="text-sm">📍 Location: {product.location}</p>
              <p className="text-sm">⏱ Years of Use: {product.yearsOfUse}</p>
              <p className="text-sm">
                👤 Seller: {product.sellerName}{" "}
                {product.sellerVerified && <span className="verified">✔️</span>}
              </p>

              {!product.fake ? (
                <button
                  onClick={() => {
                    if (!auth.currentUser) {
                      alert("Please login to book a product.");
                      return;
                    }
                    setSelectedProduct(product);
                  }}
                  className="btn-book"
                >
                  Book Now
                </button>
              ) : (
                <p className="demo-text">Demo product</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && auth.currentUser && (
        <BookingModal
          item={selectedProduct}
          user={auth.currentUser}
          onClose={() => setSelectedProduct(null)}
          onBooked={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default CategoryPage;