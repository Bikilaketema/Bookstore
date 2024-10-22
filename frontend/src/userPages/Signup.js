import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const labelStyle = {
  fontSize: "20px",
};

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: formData.email, // Allows using email or username to log in
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        // Successful login
        localStorage.setItem("userToken", data.token); // Save the JWT in local storage
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        // Successful registration
        setSuccessMessage("Account created successfully. Logging in...");
        // Automatically log in the user
        await handleLogin();
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "skyblue",
        marginTop: "3%",
        borderRadius: "20px",
        padding: "20px",
        width: "100%",
        height: "70vh",
        overflowY: "auto",
      }}
    >
      <h1 style={{ marginBottom: "2%" }}>Sign up</h1>
      {successMessage && <div className="text-success">{successMessage}</div>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="firstName" style={labelStyle}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName" style={labelStyle}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="email" style={labelStyle}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="username" style={labelStyle}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="password" style={labelStyle}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="confirmPassword" style={labelStyle}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        {error && <div className="text-danger">{error}</div>}
        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            style={{ color: "white", marginTop: "2%", marginBottom: "2%" }}
          >
            Sign up
          </Button>
        </div>
      </Form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>Already have an account?</p>
        <Button variant="secondary" style={{ marginBottom: "3%" }}>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Log in
          </Link>
        </Button>
      </div>
    </Container>
  );
}

export default Signup;
