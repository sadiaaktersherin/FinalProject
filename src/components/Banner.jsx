import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";

export default function Banner() {
  const wallpapers = [
    // your wallpapers...
    "https://images.unsplash.com/photo-1606761564773-8671a021ca6f?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1612832021431-4b4aa21e3d9b?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wallpapers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + wallpapers.length) % wallpapers.length);
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % wallpapers.length);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="banner-container">
      {/* Slides */}
      {wallpapers.map((img, idx) => (
        <div
          key={idx}
          className={`banner-slide ${idx === currentIndex ? "active" : ""}`}
        >
          <img src={img} alt="Banner" className="banner-img" />
        </div>
      ))}

      <div className="banner-overlay">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for items…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <h1 className="banner-title">Welcome to Second-hand Marketplace</h1>
        <p className="banner-subtitle">
          Buy and sell quality used items in your city.
        </p>
      </div>

      {/* Arrows */}
      <button className="arrow left" onClick={prevSlide}>◀</button>
      <button className="arrow right" onClick={nextSlide}>▶</button>

      {/* Dots */}
      <div className="banner-dots">
        {wallpapers.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? "active-dot" : ""}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
