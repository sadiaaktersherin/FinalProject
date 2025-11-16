import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-top">Second-hand</span>
            <span className="logo-bottom">Marketplace</span>
          </Link>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "change" : ""}`}></div>
          <div className={`bar ${menuOpen ? "change" : ""}`}></div>
          <div className={`bar ${menuOpen ? "change" : ""}`}></div>
        </div>

        {/* Menu Links */}
        <div className={`navbar-center-menu ${menuOpen ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>

          {/* Dropdown */}
          <li className="dropdown">
            <span className="dropbtn">Category ▼</span>
            <div className="dropdown-content">
              <Link to="/category/electronics">Electronics</Link>
              <Link to="/category/books">Books</Link>
              <Link to="/category/furniture">Furniture</Link>
              <Link to="/category/clothing">Clothing</Link>
              <Link to="/category/accessories">Accessories</Link>
            </div>
          </li>

          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact Us</Link>

        
        </div>

        {/* Auth Buttons (desktop) */}
        <div className="navbar-auth">
          <Link to="/login" className="auth-btn">Login</Link>
          <Link to="/signup" className="auth-btn signup-btn">Signup</Link>
        </div>
      </div>
    </nav>
  );
}
