import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import OrderHistory from "./OrderHistory";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminFoodItems from "./AdminFoodItems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/admin-food-items" element={<AdminFoodItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;