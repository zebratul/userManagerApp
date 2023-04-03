import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const SERVER_URL = "https://task4-backend.onrender.com"; // declare the server URL variable

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
        `${SERVER_URL}/login`, // use the server URL variable
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        setLoading(false); 
        setUserInfo(email); 
        navigate("/dashboard");
      }, 3000); // wait 500ms before navigating
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
    <Container className="login-container">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h1 className="text-center mb-4">Login</h1>
          {blocked && (
            <Alert variant="danger">
              Your account has been blocked. Please contact support.
            </Alert>
          )}
          {user && <p>Logged in as {user}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Login
            </Button>
          </Form>
          {loading && <p>Loading...</p>}
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="text-center">
            <Link to="/register">Create an account</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
  
}

export default Login;
