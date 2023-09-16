import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import Book from "./Book";

const URL = "http://localhost:5000/book/";

const fetchBooks = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.books;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <h3>Loading...</h3>
        </div>
      ) : error ? (
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
