import React, { useState } from "react";
import Toast from "./Toast";
import "./BookingModal.css";

export default function BookingModal({ item, user, onClose, onBooked }) {
  const [phone, setPhone] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking Info:", {
      user: user.displayName || user.email,
      email: user.email,
      item: item.name,
      price: item.resalePrice,
      phone,
      meetingLocation,
    });

    // Show toast
    setShowToast(true);

    // Automatically close toast and modal after 2 seconds
    setTimeout(() => {
      setShowToast(false);
      onBooked(); // Close modal in parent
    }, 2000);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("booking-modal-overlay")) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="booking-modal-overlay"
        onClick={handleOverlayClick}
      >
        <div className="booking-modal">
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
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

            <button type="submit" className="submit-btn">
              Submit Booking
            </button>
          </form>
        </div>
      </div>

      {showToast && (
        <Toast message="Item successfully booked!" onClose={() => setShowToast(false)} />
      )}
    </>
  );
}
