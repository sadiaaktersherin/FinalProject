import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Oops! The page you are looking for does not exist.</p>
      <div className="notfound-buttons">
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
        <Link to="/blog" className="btn btn-secondary">
          Visit Blog
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
