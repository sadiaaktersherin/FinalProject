import React from "react";
import "./CategoryCard.css";

export default function CategoryCard({ name, img, description, badge, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={img} alt={name} className="category-img" />
      
      {/* Optional badge */}
      {badge && <div className="category-badge">{badge}</div>}

      {/* Bottom overlay with name and description */}
      <div className="category-bottom">
        <h3 className="category-name">{name}</h3>
        {description && <p className="category-desc">{description}</p>}
      </div>
    </div>
  );
}
