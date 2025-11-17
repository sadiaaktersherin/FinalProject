import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import "./SearchResults.css";

// Dummy products (at least 20)
const products = [
  { id: 1, name: "Laptop", imageUrl: "https://via.placeholder.com/400x250", resalePrice: 500, originalPrice: 1000, yearsOfUse: 2, location: "New York", sellerName: "Alice", sellerVerified: true },
  { id: 2, name: "Phone", imageUrl: "https://via.placeholder.com/400x250", resalePrice: 200, originalPrice: 600, yearsOfUse: 1, location: "Los Angeles", sellerName: "Bob", sellerVerified: false },
  // ...add more products up to 20+
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 3 + i,
    name: `Product ${3 + i}`,
    imageUrl: `https://picsum.photos/400/250?random=${3 + i}`,
    resalePrice: Math.floor(Math.random() * 500),
    originalPrice: Math.floor(Math.random() * 1000) + 500,
    yearsOfUse: Math.floor(Math.random() * 5) + 1,
    location: ["New York", "LA", "Chicago", "Boston"][i % 4],
    sellerName: `Seller ${i + 1}`,
    sellerVerified: i % 2 === 0,
  })),
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get("query") || "";
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const matchingProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bottomProducts = products.slice(0, 20);

  const handleBook = (product) => {
    if (!user) {
      alert("You need to login first to book this product.");
      navigate("/login");
      return;
    }
    alert(`You booked: ${product.name}`);
  };

  return (
    <div className="page-content">
      <h2>Search results for: "{searchTerm}"</h2>

      {matchingProducts.length > 0 ? (
        <div className="matching-products">
          {matchingProducts.map((product) => (
            <ProductCard key={product.id} product={product} onBook={handleBook} />
          ))}
        </div>
      ) : (
        <p className="no-results">No products found</p>
      )}

      <h3>Other products you might like</h3>
      <div className="bottom-products">
        {bottomProducts.map((product) => (
          <ProductCard key={product.id} product={product} onBook={handleBook} />
        ))}
      </div>
    </div>
  );
}
