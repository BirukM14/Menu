// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';  // Assuming you have styles here
import { api } from "../services/api";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("api/register", {
        name,
        email,
        password,
      });

      if (response) {
        navigate("/login"); // Redirect to login page after successful registration
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="register h2">Register</h2>
      <form className ="register" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
