import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Second-Hand Marketplace</h3>
        <p>Buy and sell quality items safely and easily.</p>
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">FB</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">TW</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">IG</a>
        </div>
        <p>© {new Date().getFullYear()} Second-Hand Marketplace</p>
      </div>
    </footer>
  );
}
