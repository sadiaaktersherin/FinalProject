import React from "react";
import "./CategoryCard.css";

export default function CategoryCard({ name, img, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={img} alt={name} className="category-img" />
      <div className="category-overlay">
        <h3 className="category-name">{name}</h3>
      </div>
    </div>
  );
}
