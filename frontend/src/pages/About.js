import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const About = () => {
  return (
    <Container className="my-5">
    <Row>
      <Col md={6}>
        <h1>About BB Bookstore</h1>
        <p>
          BB Bookstore is your premier destination for finding and purchasing a wide variety of books,
          from bestsellers to rare gems. We are passionate about literature and committed to providing
          book enthusiasts with an exceptional shopping experience.
        </p>
        <p>
          Our bookstore is home to a vast collection of books, including fiction, non-fiction, academic,
          and more. Whether you're a seasoned reader or just starting your reading journey, we have something
          for everyone.
        </p>
        <p>
          At BB Bookstore, we believe that books have the power to educate, entertain, and inspire. We are
          dedicated to promoting a love for reading and fostering a sense of community among book lovers.
        </p>
      </Col>
      <Col md={6}>
        <Image src="./BBLogo.jpg" alt="BB Bookstore" fluid />
      </Col>
    </Row>
  </Container>
  )
}

export default About
