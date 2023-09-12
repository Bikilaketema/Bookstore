import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const labelstyle = {
  textAlign: 'center',
  fontSize: '20px',
  alignItems: 'center',
  marginBottom: '8%'
}

function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        // Clear previous admin's data from local storage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminEmail');
  
        // Store the new admin's data in local storage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminName', data.name); // Replace 'name' with the actual field name containing the admin's name in the response data
        localStorage.setItem('adminEmail', data.email);
  
        navigate('/admin/');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Admin Login error:', error);
    }
  };
  

  return (
    <Container style={{
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
    }}>
      <h1 style={{
        marginBottom: '5%'
      }}>Log in | For Admins only</h1>
      {error && <div className="text-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" style={labelstyle}>
          <Form.Label>
            Email
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email or username"
            value={credentials.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="password" style={labelstyle}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />

          <Button variant="primary" type="submit" style={{
            marginTop: '5%'
          }}>
            Log in
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default AdminLogin;
