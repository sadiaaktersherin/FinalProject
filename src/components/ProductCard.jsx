// src/components/ProductCard.jsx
import React from "react";
import "./ProductCard.css"; // import plain CSS

export default function ProductCard({ product, onBook }) {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl || "https://via.placeholder.com/400x250"}
        alt={product.name}
        className="product-img"
      />
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-location">Location: {product.location}</p>
        <p className="product-price">
          Resale: ${product.resalePrice} | Original: ${product.originalPrice}
        </p>
        <p className="product-use">Used: {product.yearsOfUse} years</p>
        <p className="product-seller">
          Seller: {product.sellerName} {product.sellerVerified && <span className="verified">✔️</span>}
        </p>
        <button className="btn-book" onClick={() => onBook(product)}>
          Book now
        </button>
      </div>
    </div>
  );
}