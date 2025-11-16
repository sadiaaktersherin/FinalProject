import React from "react";
import "./ProductCard.css"; // make sure to update this CSS

export default function ProductCard({ product, onBook }) {
  return (
    <div className="product-card" onClick={() => onBook(product)}>
      <div className="product-img-container">
        <img
          src={product.imageUrl || "https://via.placeholder.com/400x250"}
          alt={product.name}
          className="product-img"
        />
        <div className="product-overlay">
          <h4 className="product-name">{product.name}</h4>
          <p className="product-price">
            Resale: ${product.resalePrice} | Original: ${product.originalPrice}
          </p>
          <p className="product-use">Used: {product.yearsOfUse} yrs</p>
        </div>
      </div>
      <div className="product-info">
        <p className="product-location">Location: {product.location}</p>
        <p className="product-seller">
          Seller: {product.sellerName}{" "}
          {product.sellerVerified && <span className="verified">✔️</span>}
        </p>
        <button className="btn-book" onClick={() => onBook(product)}>
          Book Now
        </button>
      </div>
    </div>
  );
}
