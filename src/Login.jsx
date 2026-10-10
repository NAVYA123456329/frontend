import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "https://project-backend-nk3b.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );

      if (!response.ok) {
        alert("Invalid email or password");
        return;
      }

      const user = await response.json();

      if (user) {
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      alert("Cannot connect to backend");
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-section">
          <div className="brand">
            <h1>🍕 FoodOrderApp</h1>
          </div>

          <h2>Welcome Back!</h2>
          <p className="login-subtitle">
            Login to order your favourite food
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "⊙" : "◉"}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="register-link">
            <span>New user?</span>
            <button type="button" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>

          <div className="register-link">
            <span>Are you an admin?</span>
            <button
              type="button"
              onClick={() => navigate("/admin-login")}
            >
              Admin Login
            </button>
          </div>
        </div>

        <div className="food-section">
          <div className="food-overlay">
            <div className="food-icon">🍕</div>
            <h2>Delicious Food</h2>
            <p>Select Your Choices!</p>
            <div className="food-items">
              <span>🍔</span>
              <span>🍟</span>
              <span>🍰</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
