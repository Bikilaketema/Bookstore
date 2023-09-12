import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Container, Row, Col, Card } from "react-bootstrap";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.error("User token not found in localStorage");
      return;
    }

    const decoded = jwt_decode(token);

    const userData = {
      username: decoded.username,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    };

    setUser(userData);
  }, []);

  return (
    <Container className="mt-5" style={{ height: "100%", width: "100%" }}>
      <h4 className="text-center mb-5">User Dashboard</h4>
      <Row style={{ height: "100%" }}>
        {user && (
          <Col xs={12} sm={6} md={4} lg={3} style={{ height: "100%" }}>
            <Card style={{ height: "100%" }}>
              <Card.Body>
                <h5 className="card-title">User Information</h5>
                <p className="card-text">
                  <strong>Username:</strong> {user.username}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="card-text">
                  <strong>Full Name:</strong> {user.firstName} {user.lastName}
                </p>
              </Card.Body>
            </Card>
          </Col>
        )}

        {/* Add your additional container content here */}
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          <Container className="additional-container" style={{ width: "100%" }}>
            <Card style={{ width: "100%" }}>
              <h4 className="text-center">Your books</h4>
              {/* Add your content for the additional container */}
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
