import React, { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

export default function BookingModal({ isOpen, onClose, product, user }) {
  const [phone, setPhone] = useState('')
  const [meeting, setMeeting] = useState('')

  if (!product) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // In real app: save booking to Firestore
    alert('Booked: ' + product.name + '\nPhone: ' + phone + '\nMeeting: ' + meeting)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Book Item">
      <h2>Book: {product.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Your name</label>
          <input value={user?.name || ''} readOnly />
        </div>
        <div>
          <label>Your email</label>
          <input value={user?.email || ''} readOnly />
        </div>
        <div>
          <label>Item</label>
          <input value={product.name} readOnly />
        </div>
        <div>
          <label>Price</label>
          <input value={product.resalePrice} readOnly />
        </div>
        <div>
          <label>Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Meeting location</label>
          <input value={meeting} onChange={e=>setMeeting(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose} style={{marginLeft:8}}>Cancel</button>
      </form>
    </Modal>
  )
}
