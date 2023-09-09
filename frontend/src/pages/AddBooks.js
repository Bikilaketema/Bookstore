import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';


const labelStyle = {
  fontSize: '20px',
};

function AddBooks() {
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
      <h3 style={{ marginBottom: '2%' }}> Insert book details </h3>
      <Form>
        <Row>
          {/* First Name and Last Name in the same row */}
          <Col>
            <Form.Group controlId="title" style={labelStyle}>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter the books title" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="genre" style={labelStyle}>
              <Form.Label>Book genre</Form.Label>
              <Form.Control type="text" placeholder="Enter the books genre" />
            </Form.Group>
          </Col>
        </Row>


        <Row>
          <Col>
            <Form.Group controlId="author" style={labelStyle}>
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" placeholder="Enter the name of the Author" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="year" style={labelStyle}>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter the books description" />
            </Form.Group>
          </Col>
        </Row>

        {/* Password and Confirm Password in the same row */}
        <Row>
          <Col>
            <Form.Group controlId="cover page" style={labelStyle}>
              <Form.Label>Cover page URL</Form.Label>
              <Form.Control type="text" placeholder="Enter the books coverpage URL" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="price" style={labelStyle}>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter the books price" />

            </Form.Group>
          </Col>
        </Row>
        <div className="text-center" >
              <Button variant="primary" style={{color:'white', marginTop:'8%',marginBottom:'2%'}}>
              Add book
              </Button>
            </div>
        
      </Form>
    </Container>
  );
}

export default AddBooks;
