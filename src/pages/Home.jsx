import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import Banner from "../components/Banner"; // ✅ Our live wallpaper banner
import "./Home.css";

const categories = [
  { id: "electronics", name: "Electronics", img: "https://images.unsplash.com/400x400/?electronics" },
  { id: "clothing", name: "Clothing", img: "https://images.unsplash.com/400x400/?clothing" },
  { id: "books", name: "Books", img: "https://images.unsplash.com/400x400/?books" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (id) => navigate(`/category/${id}`);

  return (
    <div className="home-container">

      {/* ✅ Use only new Banner component */}
      <Banner />

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
