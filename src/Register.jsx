import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        }
      );

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      alert("Cannot connect to backend");
    }
  }

  return (
    <div className="register-page">

      <div className="register-container">

        {/* Left side */}
        <div className="register-form-section">

          <div className="brand">
            <h1>🍕 FoodOrderApp</h1>
          </div>

          <h2>Create Account</h2>

          <p className="register-subtitle">
            Join us and start ordering your favourite food
          </p>

          <form onSubmit={handleRegister}>

            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="password-box">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
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

            <div className="form-group">
              <label>Confirm Password</label>

              <div className="password-box">

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Confirm your password"
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                    {showPassword ? "⊙" : "◉"}
                </button>

              </div>
            </div>

            <button type="submit" className="register-button">
              Register
            </button>

          </form>

          <div className="login-link">
            <span>Already have an account?</span>

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

        </div>

        {/* Right side - Biryani and spices */}
        <div className="register-food-section">
  <img
    src="https://www.grhasti.com/images/grhasti_biryani.jpeg"
    alt="Vegetable biryani with spices"
    className="register-food-image"
  />
</div>

      </div>

    </div>
  );
}

export default Register;