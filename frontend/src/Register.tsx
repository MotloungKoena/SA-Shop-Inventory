import { useState } from 'react';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    shopName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // this must match your backend port
      const response = await fetch('http://localhost:5142/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shopName: formData.shopName,
          email: formData.email,
          passwordHash: formData.password, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Success! ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Failed to connect to the server. Is the backend running?");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create an Account</h2>
        <p>Start managing your shop today.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Shop Name</label>
            <input 
              type="text" 
              name="shopName" 
              placeholder="e.g., Joe's Grocery" 
              value={formData.shopName} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="you@example.com" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
}