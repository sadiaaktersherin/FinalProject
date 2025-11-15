import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{padding:12, borderBottom:'1px solid #ddd'}}>
      <Link to="/" style={{marginRight:16}}>Home</Link>
      <Link to="/category/phones" style={{marginRight:16}}>Phones</Link>
      <Link to="/category/laptops" style={{marginRight:16}}>Laptops</Link>
      <Link to="/category/furniture" style={{marginRight:16}}>Furniture</Link>
      <Link to="/dashboard" style={{float:'right'}}>Dashboard</Link>
    </nav>
  )
}
