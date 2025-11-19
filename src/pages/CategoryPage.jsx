import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BookingModal from "../components/BookingModal";
import { auth } from "../services/firebase";
import Spinner from "../components/Spinner";
import "./CategoryPage.css";

// Simulated API fetch
const fetchCategoryProducts = async (categoryId) => {
  const locations = ["New York","Los Angeles","Chicago","Houston","San Francisco","Seattle","Miami","Boston","Denver","Austin"];
  const sellers = ["John Doe","Jane Smith","Alice Johnson","Bob Williams","Charlie Brown","David Lee","Eva Green","Frank Miller","Grace Kim","Henry Adams"];
  
  const productNameSamples = {
    electronics: ["iPhone 14","Samsung Galaxy","MacBook Pro","Dell XPS","Sony Headphones","Canon Camera","GoPro Hero","Apple Watch","AirPods","Kindle"],
    clothing: ["Leather Jacket","Nike Sneakers","T-Shirt","Jeans","Hoodie","Adidas Shoes","Formal Shirt","Casual Pants","Jacket","Sweater"],
    books: ["Harry Potter","Lord of the Rings","JS Guide","React Handbook","Python Basics","Clean Code","Atomic Habits","C++ Primer","JavaScript Mastery","Learn CSS"],
    furniture: ["Gaming Chair","Office Desk","Bookshelf","Coffee Table","Sofa","Dining Table","Bed Frame","Wardrobe","TV Stand","Study Table"],
    accessories: ["Watch","Backpack","Sunglasses","Bluetooth Speaker","Hat","Wallet","Belt","Necklace","Bracelet","Keychain"]
  };

  const result = [];
  for (let i = 0; i < 50; i++) {
    const nameList = productNameSamples[categoryId.toLowerCase()] || ["Item"];
    const name = nameList[i % nameList.length];
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
      imageUrl: `https://picsum.photos/400/400?random=${categoryId}${i}`,
    });
  }
  return result;
};

const CategoryPage = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products, isLoading } = useQuery(["category", id], () => fetchCategoryProducts(id));

  if (isLoading) return <Spinner />;

  return (
    <div className="category-page">
      <h2 className="category-title">Category: {id}</h2>

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
            <div className="product-img-container">
              <img src={product.imageUrl} alt={product.name} className="product-img" />
              <div className="product-overlay">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">Resale: ${product.resalePrice} | Original: ${product.originalPrice}</p>
                <p className="product-use">Used: {product.yearsOfUse} yrs</p>
              </div>
            </div>
            <div className="product-info">
              <p className="product-location">Location: {product.location}</p>
              <p className="product-seller">
                Seller: {product.sellerName} {product.sellerVerified && <span className="verified">✔️</span>}
              </p>
              <button
                className="btn-book"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!auth.currentUser) {
                    alert("Please login to book a product.");
                    return;
                  }
                  setSelectedProduct(product);
                }}
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
