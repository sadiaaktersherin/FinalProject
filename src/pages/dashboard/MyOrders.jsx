import React, { useState } from "react";
import { db, auth } from "../../services/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "../../components/Spinner";
import "./MyOrders.css";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY"); // Replace with your Stripe public key

const fetchOrders = async () => {
  if (!auth.currentUser) return [];
  const q = query(
    collection(db, "bookings"),
    where("buyerUid", "==", auth.currentUser.uid)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const MyOrders = () => {
  const queryClient = useQueryClient();
  const [modalOrder, setModalOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const { data: orders, isLoading } = useQuery(["orders"], fetchOrders, {
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation(
    async (orderId) => {
      await updateDoc(doc(db, "bookings", orderId), { paid: true });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]);
        setToastMessage("✔ Payment Successful!");
        setTimeout(() => setToastMessage(""), 3000);
      },
    }
  );

  const handlePayment = async () => {
    if (!modalOrder) return;

    try {
      const stripe = await stripePromise;
      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: modalOrder.id,
          price: modalOrder.resalePrice,
          productName: modalOrder.productName,
        }),
      });

      const session = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) console.log(error);

      setModalOrder(null);
    } catch (err) {
      console.error(err);
    }
  };

  const simulatePayment = () => {
    if (!modalOrder) return;
    mutation.mutate(modalOrder.id);
    setModalOrder(null);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="orders-container">
      <h2 className="page-title">My Orders</h2>

      {!orders || orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3 className="order-title">{order.productName}</h3>
              <p><strong>Price:</strong> ${order.resalePrice}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Meeting Location:</strong> {order.meetingLocation}</p>
              <p className="paid-status">
                <strong>Status:</strong>{" "}
                {order.paid ? <span className="paid">✔ Paid</span> : <span className="not-paid">❌ Not Paid</span>}
              </p>

              {!order.paid && (
                <button className="pay-btn" onClick={() => setModalOrder(order)}>Pay Now</button>
              )}

              {order.paid && (
                <button className="paid-btn" disabled>Paid</button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      {modalOrder && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Payment</h3>
            <p>Pay <strong>${modalOrder.resalePrice}</strong> for:</p>
            <p className="modal-product">{modalOrder.productName}</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handlePayment}>Pay via Stripe</button>
              <button className="confirm-btn" onClick={simulatePayment}>Simulate Payment</button>
              <button className="cancel-btn" onClick={() => setModalOrder(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
};

export default MyOrders;
