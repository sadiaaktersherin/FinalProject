import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    await auth.signOut();
    alert("Logged out!");
    navigate("/");
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <span className="logo-top">Second-hand</span>
            <span className="logo-bottom">Marketplace</span>
          </Link>
        </div>

        {/* MENU - Desktop */}
        <div className="navbar-menu">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>

          {/* CATEGORY DROPDOWN */}
          <div className="dropdown">
            <span className="dropbtn" onClick={toggleDropdown}>Category ▼</span>
            <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
              <Link to="/category/electronics" onClick={closeMenu}>Electronics</Link>
              <Link to="/category/books" onClick={closeMenu}>Books</Link>
              <Link to="/category/furniture" onClick={closeMenu}>Furniture</Link>
              <Link to="/category/clothing" onClick={closeMenu}>Clothing</Link>
              <Link to="/category/accessories" onClick={closeMenu}>Accessories</Link>
            </div>
          </div>

          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
        </div>

        {/* AUTH BUTTONS - Desktop */}
        <div className="auth-buttons">
          {!user ? (
            <>
              <Link to="/login" className="auth-btn">Login</Link>
              <Link to="/signup" className="auth-btn signup-btn">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="auth-btn">Dashboard</Link>
              <button onClick={handleLogout} className="auth-btn logout-btn">Logout</button>
            </>
          )}
        </div>

        {/* HAMBURGER - Mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open-top" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open-middle" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open-bottom" : ""}`}></div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>

          <div>
            <button onClick={toggleDropdown} className="dropbtn">Category ▼</button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <Link to="/category/electronics" onClick={closeMenu}>Electronics</Link>
                <Link to="/category/books" onClick={closeMenu}>Books</Link>
                <Link to="/category/furniture" onClick={closeMenu}>Furniture</Link>
                <Link to="/category/clothing" onClick={closeMenu}>Clothing</Link>
                <Link to="/category/accessories" onClick={closeMenu}>Accessories</Link>
              </div>
            )}
          </div>

          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/contact" onClick={closeMenu}>Contact Us</Link>

          <div className="auth-buttons-mobile">
            {!user ? (
              <>
                <Link to="/login" onClick={closeMenu} className="auth-btn">Login</Link>
                <Link to="/signup" onClick={closeMenu} className="auth-btn signup-btn">Signup</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" onClick={closeMenu} className="auth-btn">Dashboard</Link>
                <button onClick={handleLogout} className="auth-btn logout-btn">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
