import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddProduct from "./dashboard/AddProduct";
import MyProfile from "./dashboard/MyProfile";
import MyProducts from "./dashboard/MyProduct";
import MyOrders from "./dashboard/MyOrders";   // ⭐ Must Import
import "./dashboard/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <h3>Dashboard</h3>
        <ul>
          <li><Link to="profile">My Profile</Link></li>
          <li><Link to="add-product">Add Product</Link></li>
          <li><Link to="my-products">My Products</Link></li>
          <li><Link to="my-orders">My Orders</Link></li>   {/* ⭐ Add Link */}
        </ul>
      </aside>

      <main className="dashboard-content">
        <Routes>
          <Route path="profile" element={<MyProfile />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="my-orders" element={<MyOrders />} /> {/* ⭐ Add Route */}
          <Route index element={<h2>Welcome to your dashboard!</h2>} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
