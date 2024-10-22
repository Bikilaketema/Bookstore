import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

const labelStyle = {
  textAlign: "center",
  fontSize: "20px",
  alignItems: "center",
  marginBottom: "8%",
};

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        // Successful user login, store the JWT token in local storage
        localStorage.setItem("userToken", data.token); // Use a different key for user token
        navigate("/books");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("User Login error:", error);
    }
  };

  const location = useLocation();
  // Extract the success message from the query parameter
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get("success") || "";

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
      <h1 style={{ marginBottom: "5%" }}>Log in</h1>
      {successMessage && (
        <div className="text-success" style={{ marginBottom: "2%" }}>
          {successMessage}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="identifier" style={labelStyle}>
          {error && <div className="text-danger">{error}</div>}
          <Form.Label>Email | Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email or username"
            name="identifier"
            value={credentials.identifier}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="password" style={labelStyle}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />

          <Button variant="primary" type="submit" style={{ marginTop: "5%" }}>
            Log in
          </Button>
        </Form.Group>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Don't have an account?</p>
          <Button
            variant="secondary"
            style={{
              marginBottom: "3%",
            }}
            onClick={handleSignUpClick}
          >
            <Link
              to="signup"
              style={{ color: "white", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
