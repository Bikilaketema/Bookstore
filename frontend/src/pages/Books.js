import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap"; // Import React Bootstrap components
import Book from "./Book";

const URL = "http://localhost:5000/book/";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        setBooks(data.books);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <Container>
    {loading ? ( // Render loading message while data is being fetched
      <div style={{ textAlign: "center" }}>
        <h3>Loading...</h3>
      </div>
    ) : books.length === 0 ? ( // Display "Connection problem" when no books are available
      <div style={{ textAlign: "center" }}>
        <h3>Connection problem</h3>
        <p>Please check your connection and refresh the page!</p>
      </div>
    ) : (
      <Row>
        {books.map((book, i) => (
          <Col key={i} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Card.Body>
                <Book book={book} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )}
  </Container>
  
  );
};

export default Books;
