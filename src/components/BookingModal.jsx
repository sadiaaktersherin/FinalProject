// src/components/BookingModal.jsx
import React, { useState } from "react";
import "./BookingModal.css";

export default function BookingModal({ item, user, onClose, onBooked }) {
  const [phone, setPhone] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normally here you would send data to backend
    console.log("Booking Info:", {
      user: user.displayName || user.email,
      email: user.email,
      item: item.name,
      price: item.resalePrice,
      phone,
      meetingLocation,
    });

    setBookingSuccess(true);

    setTimeout(() => {
      setBookingSuccess(false);
      onBooked(); // Close the modal in parent
    }, 2000);
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Book Item</h2>

        <form onSubmit={handleSubmit} className="booking-form">
          <label>Name</label>
          <input type="text" value={user.displayName || user.email} disabled />

          <label>Email</label>
          <input type="email" value={user.email} disabled />

          <label>Item Name</label>
          <input type="text" value={item.name} disabled />

          <label>Price ($)</label>
          <input type="number" value={item.resalePrice} disabled />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Meeting Location</label>
          <input
            type="text"
            placeholder="Enter meeting location"
            value={meetingLocation}
            onChange={(e) => setMeetingLocation(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">Submit Booking</button>
        </form>

        {bookingSuccess && <div className="booking-success">Item successfully booked!</div>}
      </div>
    </div>
  );
}
