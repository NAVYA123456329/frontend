import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleAdminLogin(event) {
    event.preventDefault();

    if (username === "admin" && password === "admin123") {
      alert("Admin login successful!");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid admin username or password");
    }
  }

  return (
    <div className="admin-login-page">
      <h1>🍕 FoodOrderApp</h1>
      <h2>Admin Login</h2>

      <form onSubmit={handleAdminLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter admin username"
            required
          />
        </div>

        <br />

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            required
          />
        </div>

        <br />

        <button type="submit">Admin Login</button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{ marginLeft: "10px" }}
        >
          Back to User Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;