import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginForm.css"; // Import the CSS file
import logo from "./assets/logo.png";

const LoginForm = ({ onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Dummy credentials for login (Replace with backend API call)
    if (email === "admin@gmail.com" && password === "admin123") {
      onAuth("admin");
      navigate("/dashboard");  // Redirect after login
    } else if (email === "user@gmail.com" && password === "user123") {
      onAuth("user");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="Company Logo" className="form-logo" />
      <h2 className="auth-title">Login Form</h2>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
