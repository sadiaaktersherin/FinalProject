// src/components/CategoryCard.jsx
import React from "react";

const CategoryCard = ({ name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition p-4 flex items-center justify-center bg-white"
    >
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  );
};

export default CategoryCard;