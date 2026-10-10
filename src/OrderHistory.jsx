import { useEffect, useState } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://project-backend-nk3b.onrender.com/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch(() => {
        alert("Cannot connect to backend");
      });
  }, []);

  return (
    <div>
      <h1>FoodOrderApp</h1>
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Total: ₹{order.total}</p>
            <p>Status: {order.status}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;