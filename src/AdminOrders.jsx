import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  async function updateStatus(orderId, newStatus) {
  try {
    const response = await fetch(
      `https://project-backend-nk3b.onrender.com/api/orders/${orderId}/status?status=${newStatus}`,
      {
        method: "PUT"
      }
    );

    if (response.ok) {
      const updatedOrder = await response.json();

      setOrders(
        orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );

      alert("Order status updated!");
    } else {
      alert("Failed to update order status");
    }
  } catch (error) {
    alert("Cannot connect to backend");
  }
}

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

      <h2>Manage Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>Total: ₹{order.total}</p>
            <p>Status: {order.status}</p>

            <select
              value={order.status || "PLACED"}onChange={(event) => updateStatus(order.id, event.target.value)}>
              <option value="PLACED">PLACED</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="PREPARING">PREPARING</option>
              <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>



            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;