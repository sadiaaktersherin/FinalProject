// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import "./Home.css"; // Import the plain CSS file

const categories = [
  { id: "electronics", name: "Electronics", img: "https://source.unsplash.com/400x400/?electronics" },
  { id: "clothing", name: "Clothing", img: "https://source.unsplash.com/400x400/?clothing" },
  { id: "books", name: "Books", img: "https://source.unsplash.com/400x400/?books" },
];

const banners = [
  "https://source.unsplash.com/1600x600/?market,secondhand",
  "https://source.unsplash.com/1600x600/?shopping,thrift",
  "https://source.unsplash.com/1600x600/?electronics,secondhand",
];

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);

  const handleCategoryClick = (id) => navigate(`/category/${id}`);

  return (
    <div className="home-container">
      {/* Banner Section */}
      <section className="banner">
        <img src={banners[currentSlide]} alt="Banner" className="banner-img" />

        {/* Left/Right Arrows */}
        <button onClick={prevSlide} className="arrow left">◀</button>
        <button onClick={nextSlide} className="arrow right">▶</button>

        {/* Dots */}
        <div className="dots">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`dot ${index === currentSlide ? "active" : ""}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              img={cat.img}
              onClick={() => handleCategoryClick(cat.id)}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-section">
        <h2>Why choose second-hand?</h2>
        <p>
          Save money, reduce waste, and discover hidden gems in your city. Buying second-hand is eco-friendly,
          supports local sellers, and gives products a second life.
        </p>
        <div className="why-grid">
          <div className="why-card">
            <h3>Eco-Friendly</h3>
            <p>Reduce waste and help the environment by giving products a second life.</p>
          </div>
          <div className="why-card">
            <h3>Save Money</h3>
            <p>Find high-quality items at a fraction of the original price.</p>
          </div>
          <div className="why-card">
            <h3>Support Community</h3>
            <p>Help local sellers and strengthen the community economy.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;