import React from 'react'

export default function ProductCard({ product, onBook }) {
  return (
    <div style={{border:'1px solid #ddd', borderRadius:8, overflow:'hidden'}}>
      <img src={product.imageUrl || 'https://via.placeholder.com/400x250'} alt={product.name} style={{width:'100%', height:180, objectFit:'cover'}} />
      <div style={{padding:12}}>
        <h4>{product.name}</h4>
        <p>Location: {product.location}</p>
        <p>Resale: {product.resalePrice} | Original: {product.originalPrice}</p>
        <p>Used: {product.yearsOfUse} years</p>
        <p>Seller: {product.sellerName} {product.sellerVerified ? '✔️' : ''}</p>
        <button onClick={() => onBook(product)} style={{marginTop:8}}>Book now</button>
      </div>
    </div>
  )
}
