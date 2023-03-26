import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUserInfo }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      setLoading(false); 
      setUserInfo(email); 
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401 && error.response.data.error === "Account blocked.") {
        setBlocked(true);
      } else {
        setError("Invalid email or password");
      }
      setLoading(false); 
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {blocked && <p>Your account has been blocked. Please contact support.</p>}
      {user && <p>Logged in as {user}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {loading && <p>Loading...</p>} {/* display loading indicator */}
      {error && <p>{error}</p>}
      <Link to="/register">Create an account</Link>
    </div>
  );
}

export default Login;
