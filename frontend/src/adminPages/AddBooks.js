import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    author:"",
    genre:"",
    coverPage:"",
    price:"",
    description:""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/admin/addbook", {
      title: String(inputs.title),
      author: String(inputs.author),
      description: String(inputs.description),
      price: Number(inputs.price),
      coverPage: String(inputs.coverPage),
      genre: String(inputs.genre)
    });
  };

  const [error, setError] = useState(""); // State to store error message

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any of the required fields are empty
    if (
      !inputs.title ||
      !inputs.author ||
      !inputs.description ||
      !inputs.price ||
      !inputs.coverPage ||
      !inputs.genre
    ) {
      setError("Please fill out all fields");
    } else {
      setError(""); // Clear any previous error messages
      sendRequest().then(() => history("/admin/"));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={10}>
          <Form onSubmit={handleSubmit}>
          {error && <div className="text-danger">{error}</div>}
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={inputs.title}
                onChange={handleChange}
                name="title"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={inputs.author}
                onChange={handleChange}
                name="author"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={inputs.description}
                onChange={handleChange}
                name="description"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={inputs.price}
                onChange={handleChange}
                name="price"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>coverPage</Form.Label>
              <Form.Control
                type="text"
                value={inputs.coverPage}
                onChange={handleChange}
                name="coverPage"
              />
            </Form.Group>
            <Form.Group>
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              value={inputs.genre}
              onChange={handleChange}
              name="genre"
            />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop:'5%',marginBottom:'5%',width:'100%',height:'7vh'}}>
              Add Book
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBook;
