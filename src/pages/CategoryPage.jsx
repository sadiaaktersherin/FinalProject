import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import BookingModal from '../components/BookingModal'

const sampleProducts = [
  { id: 'p1', name: 'iPhone X', location: 'Dhaka', resalePrice: '12000', originalPrice: '60000', yearsOfUse: 4, postedAt: new Date().toISOString(), sellerName: 'Rafi', sellerVerified: true, imageUrl: '' },
  { id: 'p2', name: 'Dell Laptop', location: 'Chittagong', resalePrice: '25000', originalPrice: '80000', yearsOfUse: 5, postedAt: new Date().toISOString(), sellerName: 'Mita', sellerVerified: false, imageUrl: '' },
]

export default function CategoryPage() {
  const { id } = useParams()
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)
  const user = { name: 'Demo User', email: 'demo@example.com' } // replace with auth user

  const onBook = (product) => {
    setSelected(product)
    setOpen(true)
  }

  return (
    <div style={{padding:20}}>
      <h1>Category: {id}</h1>
      <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12}}>
        {sampleProducts.map(p => <ProductCard key={p.id} product={p} onBook={onBook} />)}
      </div>
      <BookingModal isOpen={open} onClose={()=>setOpen(false)} product={selected} user={user} />
    </div>
  )
}
