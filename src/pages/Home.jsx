// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "./Home.css";

// Categories
const categories = [
  { id: "electronics", name: "Electronics", img: "https://picsum.photos/400/400?random=101" },
  { id: "clothing", name: "Clothing", img: "https://picsum.photos/400/400?random=102" },
  { id: "books", name: "Books", img: "https://picsum.photos/400/400?random=103" },
  { id: "furniture", name: "Furniture", img: "https://picsum.photos/400/400?random=104" },
  { id: "accessories", name: "Accessories", img: "https://picsum.photos/400/400?random=105" },
];

// Product sample data
const productNames = {
  Electronics: ["iPhone 12", "Samsung Galaxy", "MacBook Air", "Dell Laptop", "Sony Headphones"],
  Clothing: ["Leather Jacket", "Nike Sneakers", "T-Shirt", "Jeans", "Hoodie"],
  Books: ["Harry Potter", "Lord of the Rings", "JS Guide", "React Handbook", "Python Basics"],
  Furniture: ["Gaming Chair", "Office Desk", "Bookshelf", "Coffee Table", "Sofa"],
  Accessories: ["Watch", "Backpack", "Sunglasses", "Bluetooth Speaker", "Hat"]
};

const locations = ["New York","Los Angeles","Chicago","Houston","San Francisco","Seattle","Miami","Boston","Denver","Austin"];
const sellers = ["John Doe","Jane Smith","Alice Johnson","Bob Williams","Charlie Brown","David Lee","Eva Green","Frank Miller","Grace Kim","Henry Adams"];

// Generate 50 products with live Picsum images (without #1, #2 etc.)
const products = Array.from({ length: 10 }, (_, i) => {
  const category = categories[i % categories.length].name;
  const nameList = productNames[category];
  const name = nameList[Math.floor(Math.random() * nameList.length)]; // no number

  return {
    id: i + 1,
    category,
    name,
    location: locations[Math.floor(Math.random() * locations.length)],
    resalePrice: Math.floor(Math.random() * 800) + 50,
    originalPrice: Math.floor(Math.random() * 1200) + 200,
    yearsOfUse: Math.floor(Math.random() * 5) + 1,
    sellerName: sellers[Math.floor(Math.random() * sellers.length)],
    sellerVerified: Math.random() > 0.5,
    imageUrl: `https://picsum.photos/400/250?random=${i}` // unique live images
  };
});

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (id) => navigate(`/category/${id}`);
  const handleBook = (product) => alert(`You booked: ${product.name}`);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Banner with Search */}
      <Banner searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Categories */}
      <section className="categories">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map(cat => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              img={cat.img}
              onClick={() => handleCategoryClick(cat.id)}
            />
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="products-section">
        <h2 className="section-title">Available Products</h2>
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onBook={handleBook} />
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-section">
        <h2 className="section-title">Why Choose Second-Hand?</h2>
        <p className="why-description">
          Save money, reduce waste, and discover hidden gems in your city. Buying second-hand is eco-friendly,
          supports local sellers, and gives products a second life.
        </p>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">🌱</div>
            <h3>Eco-Friendly</h3>
            <p>Reduce waste and help the environment by giving products a second life.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">💰</div>
            <h3>Save Money</h3>
            <p>Find high-quality items at a fraction of the original price.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">🤝</div>
            <h3>Support Community</h3>
            <p>Help local sellers and strengthen the community economy.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}
