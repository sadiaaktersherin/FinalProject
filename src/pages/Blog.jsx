// src/pages/Blog.jsx
import React from "react";
import "./Blog.css"; // import plain CSS

const Blog = () => {
  const questions = [
    {
      q: "1. Why should we buy second-hand products?",
      a: "Buying second-hand helps save money, reduce waste, and promotes sustainability by reusing products."
    },
    {
      q: "2. How to verify a seller?",
      a: "Admins can verify sellers in the Admin Dashboard. Verified sellers will have a blue tick next to their name."
    },
    {
      q: "3. How does the booking system work?",
      a: "Buyers can book products from the category page. The booking form collects contact info and meeting location."
    },
    {
      q: "4. How is payment handled?",
      a: "Buyers can pay via Stripe (simulated in this project). After payment, the order status updates to 'Paid'."
    }
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog / FAQ</h1>

      <div className="blog-card-wrapper">
        {questions.map((item, index) => (
          <div key={index} className="blog-card">
            <h2 className="blog-question">{item.q}</h2>
            <p className="blog-answer">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;