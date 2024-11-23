// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';  
import {api} from '../services/api'

const Login = (
    {setIsAuthenticated}
) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/login", {
        email,
        password,
      });

      if (response) {
        setIsAuthenticated(true)
        navigate("/")
    }
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
