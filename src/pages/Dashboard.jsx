import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

function AddProduct() { return <div><h3>Add product (placeholder)</h3></div> }
function MyProducts() { return <div><h3>My products (placeholder)</h3></div> }
function MyOrders() { return <div><h3>My orders (placeholder)</h3></div> }

export default function Dashboard() {
  return (
    <div style={{padding:20}}>
      <h2>Dashboard</h2>
      <nav style={{marginBottom:12}}>
        <Link to="add">Add Product</Link> | <Link to="my-products" style={{marginLeft:8}}>My Products</Link> | <Link to="my-orders" style={{marginLeft:8}}>My Orders</Link>
      </nav>
      <Routes>
        <Route path="add" element={<AddProduct/>} />
        <Route path="my-products" element={<MyProducts/>} />
        <Route path="my-orders" element={<MyOrders/>} />
        <Route index element={<div>Select a dashboard page.</div>} />
      </Routes>
    </div>
  )
}
