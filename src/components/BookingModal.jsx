import React, { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const BookingModal = ({ item, user, onClose, onBooked }) => {
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  if (!item || !user) return null; // safety check

  const handleSubmit = async () => {
    if (!phone || !location) {
      alert("Please enter phone number and meeting location.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        productId: item.id,
        productName: item.name,
        resalePrice: item.resalePrice,
        buyerUid: user.uid,
        buyerName: user.displayName,
        buyerEmail: user.email,
        phone,
        meetingLocation: location,
        paid: false,
        createdAt: serverTimestamp(),
      });
      alert("✅ Item booked successfully!");
      onBooked();
      onClose();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("❌ Failed to book the item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-2">Book {item.name}</h2>
        <p className="mb-1">User: {user.displayName}</p>
        <p className="mb-1">Email: {user.email}</p>
        <p className="mb-3">Price: ${item.resalePrice}</p>

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Meeting Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded w-full mb-2"
        >
          {loading ? "Booking..." : "Submit"}
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 p-2 rounded w-full hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingModal;