import React, { useEffect, useState } from "react";
import { db, auth } from "../../services/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const q = query(collection(db, "bookings"), where("buyerUid", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePayment = async (orderId) => {
    // Simulate Stripe payment
    if (window.confirm("Simulate payment for this order?")) {
      await updateDoc(doc(db, "bookings", orderId), { paid: true });
      fetchOrders();
      alert("✅ Payment successful!");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading orders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 && <p>No orders found.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map(order => (
          <div key={order.id} className="border p-2 rounded shadow">
            <h3 className="font-bold">{order.productName}</h3>
            <p>Price: ${order.resalePrice}</p>
            <p>Phone: {order.phone}</p>
            <p>Meeting Location: {order.meetingLocation}</p>
            <p>Paid: {order.paid ? "✅ Yes" : "❌ No"}</p>
            {!order.paid && (
              <button
                onClick={() => handlePayment(order.id)}
                className="bg-green-500 text-white p-2 rounded mt-2"
              >
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;