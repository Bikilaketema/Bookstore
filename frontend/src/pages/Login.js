import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const labelstyle={
  textAlign:'center',
  fontSize:'20px',
  alignItems:'center',
  marginBottom:'8%'
}


function Login() {

  const navigate = useNavigate(); 

  const handleSignUpClick = () => {
    navigate('/signup'); 
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
        marginBottom:'5%'
      }}>Log in</h1>
      <Form>
        <Form.Group controlId="emailUsername" style={labelstyle}>
          <Form.Label >
          
          Email | Username</Form.Label>
          <Form.Control type="text" placeholder="Enter email or username" name="identifier" />
        </Form.Group>

        <Form.Group controlId="password" style={labelstyle}>
          <Form.Label >Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" />

          <Button variant="primary" type="submit" style={{
            marginTop:'5%'
          }}>
          Log in
        </Button>
        </Form.Group>

        <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center'
        }}>
        

        <p >Don't have an account?</p>
        <Button
            variant="secondary"
            style={{
              marginBottom: '3%'
            }}
            onClick={handleSignUpClick}
          >
            <Link to="signup" style={{color:'white', textDecoration:'none'}}>Sign up</Link>
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
