import React from 'react'
import { Link } from 'react-router-dom'

export default function CategoryCard({ id, title, desc }) {
  return (
    <div style={{border:'1px solid #eee', padding:12, borderRadius:8}}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <Link to={`/category/${id}`}>View Items</Link>
    </div>
  )
}
