import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap"; // Import React Bootstrap components
import Book from "./Book";

const URL = "http://localhost:5000/book";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const AdminsHome = () => {
  const [books, setBooks] = useState();

  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, []);

  return (
    <Container>
      <Row>
        {books &&
          books.map((book, i) => (
            <Col key={i} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Card.Body>
                  <Book book={book} />
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default AdminsHome;
