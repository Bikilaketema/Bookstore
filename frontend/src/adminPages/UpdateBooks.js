import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const [inputs, setInputs] = useState();
  const id = useParams().id;
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/book/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.book));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/admin/updatebook/${id}`, {
        title: String(inputs.title),
        author: String(inputs.author),
        description: String(inputs.description),
        price: Number(inputs.price),
        coverPage: String(inputs.coverPage),
        genre: String(inputs.genre),
        pdfLink: String(inputs.pdfLink),
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/admin/"));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div style={{paddingTop:'2%',paddingBottom:'2%',paddingRight:'15%',paddingLeft:'15%'}}>
      {inputs && (
        <Form onSubmit={handleSubmit}>
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
        <Form.Group>
        <Form.Label>PDF Link</Form.Label>
        <Form.Control
          type="text"
          value={inputs.pdfLink}
          onChange={handleChange}
          name="pdfLink"
        />
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginTop:'5%',width:'100%',height:'7vh'}}>
          Update Book
        </Button>
      </Form>
      )}
    </div>
  );
};

export default UpdateBook;
