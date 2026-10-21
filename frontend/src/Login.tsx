import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5142/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,  //should be passwordHash so we hash the password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("shopName", data.shopName);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Welcome Back</h2>
        <p>Log in to manage your shop.</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
          Need an account? <Link to="/register" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}