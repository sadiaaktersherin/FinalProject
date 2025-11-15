// src/components/Spinner.jsx
import React from "react";
import "./Spinner.css"; // import plain CSS

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">Loading...</p>
    </div>
  );
};

export default Spinner;