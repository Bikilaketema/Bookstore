import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const labelStyle = {
  fontSize: '20px',
};

function Signup() {
  return (
    <Container
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'skyblue',
      marginTop: '3%',
      borderRadius: '20px',
      padding: '20px',
      width: '100%',
      height: '70vh',
      overflowY: 'auto'
    }}
    >
      <h1 style={{ marginBottom: '2%' }}>Sign up</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="firstName" style={labelStyle}>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName" style={labelStyle}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="email" style={labelStyle}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="username" style={labelStyle}>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="password" style={labelStyle}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="confirmPassword" style={labelStyle}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />

            </Form.Group>
          </Col>
        </Row>
        <div className="text-center" > 
              <Button variant="primary" style={{color:'white', marginTop:'2%',marginBottom:'2%'}}>
                <Link to="/signup" style={{color:'white', textDecoration:'none'}}>Sign up</Link>
              </Button>
            </div>
        
      </Form>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p>Already have an account?</p>
        <Button variant="secondary" style={{ marginBottom: '3%' }}>
          <Link to="/login" style={{color:'white', textDecoration:'none'}}>Log in</Link>
        </Button>
      </div>
    </Container>
  );
}

export default Signup;
