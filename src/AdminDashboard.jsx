import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const navigate = useNavigate();
   return (
    <div>
      <h1>FoodOrderApp</h1>

      <h2>Admin Dashboard</h2>

      <h3>Welcome, Admin!</h3>

      <button onClick={() => navigate("/admin-orders")}>Manage Orders</button>

      <button>Manage Restaurants</button>
      <button onClick={() => navigate("/admin-food-items")}>
         Manage Food Items
      </button>

      <button>View Users</button>
    </div>
  );
}

export default AdminDashboard;