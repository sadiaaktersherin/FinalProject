import React, { useState } from 'react'
import Banner from '../components/Banner'
import CategoryCard from '../components/CategoryCard'

export default function Home() {
  const categories = [
    { id: 'phones', title: 'Phones', desc: 'Used smartphones' },
    { id: 'laptops', title: 'Laptops', desc: 'Used laptops' },
    { id: 'furniture', title: 'Furniture', desc: 'Home furniture' },
  ]

  return (
    <div>
      <Banner />
      <section style={{padding:20}}>
        <h2>Categories</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
          {categories.map(c => <CategoryCard key={c.id} {...c} />)}
        </div>
      </section>
      <section style={{padding:20}}>
        <h2>Meaningful extra section</h2>
        <p>Tips for buyers: inspect items, ask for warranty info, meet in safe public places.</p>
      </section>
      <footer style={{padding:20, borderTop:'1px solid #eee'}}>
        <p>© Second-hand Marketplace</p>
      </footer>
    </div>
  )
}
