import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";

export default function Banner() {
  // Generate 10 random Picsum images
  const wallpapers = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/1920/1080?random=${i + 1}`);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wallpapers.length);
    }, 4000); // change every 4 seconds
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
