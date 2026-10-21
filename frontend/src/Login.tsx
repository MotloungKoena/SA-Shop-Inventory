import { useState } from "react";
import "./Register.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //   const response = await fetch('http://localhost:5142/api/auth/login', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       email: email,
      //       passwordHash: password, // Sending the password in the PasswordHash field for now
      //     }),
      //   });

      const response = await fetch("http://localhost:5142/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password, // sending it as password for now, but should be passwordHash
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Welcome back, ${data.shopName}!`);
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
      </div>
    </div>
  );
}
