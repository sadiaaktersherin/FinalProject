// src/components/Footer.jsx
import React from "react";
import "./Footer.css"; // import plain CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© {new Date().getFullYear()} Second-Hand Marketplace</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#contact">Contact</a>
          <a href="#blog">Blog</a>
        </div>
        <p className="footer-small">Built with ❤️ using React and Firebase</p>
      </div>
    </footer>
  );
};

export default Footer;