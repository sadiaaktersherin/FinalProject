// src/pages/CategoryPage.jsx
import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import { auth } from "../services/firebase";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const locations = ["New York","Los Angeles","Chicago","Houston","San Francisco","Seattle","Miami","Boston","Denver","Austin"];
  const sellers = ["John Doe","Jane Smith","Alice Johnson","Bob Williams","Charlie Brown","David Lee","Eva Green","Frank Miller","Grace Kim","Henry Adams"];
  
  const productNameSamples = {
    electronics: ["iPhone 14","Samsung Galaxy","MacBook Pro","Dell XPS","Sony Headphones","Canon Camera","GoPro Hero","Apple Watch","AirPods","Kindle"],
    clothing: ["Leather Jacket","Nike Sneakers","T-Shirt","Jeans","Hoodie","Adidas Shoes","Formal Shirt","Casual Pants","Jacket","Sweater"],
    books: ["Harry Potter","Lord of the Rings","JS Guide","React Handbook","Python Basics","Clean Code","Atomic Habits","C++ Primer","JavaScript Mastery","Learn CSS"],
    furniture: ["Gaming Chair","Office Desk","Bookshelf","Coffee Table","Sofa","Dining Table","Bed Frame","Wardrobe","TV Stand","Study Table"],
    accessories: ["Watch","Backpack","Sunglasses","Bluetooth Speaker","Hat","Wallet","Belt","Necklace","Bracelet","Keychain"]
  };

  const products = useMemo(() => {
    const result = [];
    for (let i = 0; i < 50; i++) {
      const nameList = productNameSamples[id.toLowerCase()] || ["Item"];
      const name = nameList[i % nameList.length]; // ❌ removed #1, #2

      result.push({
        id: i,
        name,
        location: locations[i % locations.length],
        resalePrice: Math.floor(Math.random() * 500) + 50,
        originalPrice: Math.floor(Math.random() * 1000) + 200,
        yearsOfUse: Math.floor(Math.random() * 5) + 1,
        timePosted: `${Math.floor(Math.random() * 30) + 1} days ago`,
        sellerName: sellers[i % sellers.length],
        sellerVerified: Math.random() > 0.5,
        // ✅ Live image from Picsum guaranteed
        imageUrl: `https://picsum.photos/400/400?random=${id}${i}`,
      });
    }
    return result;
  }, [id]);

  return (
    <div className="category-page">
      <h2 className="category-title">Category: {id}</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-img" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="text-sm">📍 Location: {product.location}</p>
              <p className="text-sm">⏱ Years of Use: {product.yearsOfUse}</p>
              <p className="text-sm">🕒 Posted: {product.timePosted}</p>
              <div className="price-row">
                <p className="resale-price">${product.resalePrice}</p>
                <p className="original-price">${product.originalPrice}</p>
              </div>
              <p className="text-sm">
                👤 Seller: {product.sellerName} {product.sellerVerified && <span className="verified">✔️</span>}
              </p>
              <button
                onClick={() => {
                  if (!auth.currentUser) {
                    alert("Please login to book a product.");
                    return;
                  }
                  setSelectedProduct(product);
                }}
                className="btn-book"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && auth.currentUser && (
        <BookingModal
          item={selectedProduct}
          user={auth.currentUser}
          onClose={() => setSelectedProduct(null)}
          onBooked={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default CategoryPage;
