import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LEFT – LOGO */}
        <div className="navbar-logo">
          <Link to="/">MyBrand</Link>
        </div>

        {/* MIDDLE – MENU */}
        <div className="navbar-center-menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>

          {/* Category Dropdown */}
          <li className="dropdown">
  <span>Category ▼</span>
  <div className="dropdown-content">
    <Link to="/category/electronics">Electronics</Link>
    <Link to="/category/books">Books</Link>
    <Link to="/category/furniture">Furniture</Link>
    <Link to="/category/clothes">Clothes</Link>
  </div>
</li>


          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* RIGHT – LOGIN & SIGNUP */}
        <div className="navbar-auth">
          <Link to="/login" className="auth-btn">Login</Link>
          <Link to="/signup" className="auth-btn signup-btn">Signup</Link>
        </div>

      </div>
    </nav>
  );
}