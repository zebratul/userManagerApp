import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function RegistrationForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const serverUrl = "https://task4-backend.onrender.com"; // server URL variable

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverUrl}/register`, // use server URL variable
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Unable to register user");
    }
  };

  return (
    <Container className="registration-container">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h1 className="text-center mb-4">Registration Form</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
              Register
            </Button>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="text-center">
            <Link to="/">Already have an account? Login</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
  
}

export default RegistrationForm;
