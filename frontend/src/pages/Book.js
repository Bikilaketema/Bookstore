import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Book = (props) => {
  const history = useNavigate();
  const { _id, title, author, price, coverPage, genre } = props.book;
  const [isDeleted, setIsDeleted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const deleteHandler = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/deletebook/${_id}`
      );
      setIsDeleted(true);
      history("/admin/");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const addBookToCart = async () => {
    const userToken = localStorage.getItem("userToken");
    const userId = userToken
      ? JSON.parse(atob(userToken.split(".")[1])).id
      : null;

    if (!userId) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/cart/${userId}`, {
        productId: _id,
        quantity: 1,
      });
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding book to cart:", error);
    }
  };

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const shouldDisplayBook = props.book && !isDeleted;

  return shouldDisplayBook ? (
    <Card className="book-card">
      <Card.Img
        src={coverPage}
        alt={"Book cover img"}
        style={{ width: "100%", height: "300px" }}
      />
      <Card.Body style={{ display: "flex", flexDirection: "column" }}>
        <Card.Text>By {author}</Card.Text>
        <Card.Title>
          {title.length > 15 ? title.substring(0, 15) + "..." : title}
        </Card.Title>
        <Card.Text>Genre: {genre}</Card.Text>
        <Card.Title>Price: ETB {price}</Card.Title>

        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Product added to cart!
          </Alert>
        )}

        {isAdminRoute ? (
          <>
            <Button
              as={Link}
              to={`/admin/books/update/${_id}`}
              variant="primary"
              className="mt-auto"
              style={{ marginBottom: "2%" }}
            >
              Update
            </Button>
            <Button
              variant="danger"
              onClick={deleteHandler}
              className="mt-auto"
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              className="mt-auto"
              style={{ marginBottom: "2%" }}
              onClick={addBookToCart}
            >
              Add to cart
            </Button>

            <Button
              as={Link}
              to={`/books/detail/${_id}`}
              variant="danger"
              className="mt-auto"
            >
              More Info
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  ) : null;
};

export default Book;
