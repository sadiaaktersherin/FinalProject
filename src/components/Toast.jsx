import React from "react";
import "./Toast.css";

export default function Toast({ message, onClose }) {
  return (
    <div className="toast">
      {message}
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
