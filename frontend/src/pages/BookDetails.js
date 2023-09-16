import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBooksClick = () => {
    navigate("/books");
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/book/${id}`);
        console.log("Book details response:", response.data);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    console.log("Fetching book details...");
    fetchBookDetails();
  }, [id]);

  return (
    <Container style={{ padding: "5%" }}>
      <h1 style={{ textAlign: "center" }}>Book Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img src={book.book.coverPage} alt={book.book.title} />
          <p>
            <b>Title</b>: {book.book.title}
          </p>
          <p>
            <b>Author</b>: {book.book.author}
          </p>
          <p>
            <b>Description</b>: {book.book.description}
          </p>
          <p>
            <b>Price</b>: ETB {book.book.price}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Button style={{ height: "7vh" }} onClick={handleBooksClick}>
              Back
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default BookDetails;
