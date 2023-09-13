import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Book = (props) => {
  const history = useNavigate();
  const { _id, title, author,  price, coverPage, genre } = props.book;
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/admin/deletebook/${_id}`)
      .then((res) => res.data)
      .then(() => {
        setIsDeleted(true);
        history("/admin/");
      });
  };

  const [showAlert, setShowAlert] = useState(false);

  const addBookToCart = async () => {
    
    // Get the user ID from local storage
    const userToken = localStorage.getItem("userToken");
    const userId = userToken ? JSON.parse(atob(userToken.split(".")[1])).id : null;

    // Check if the user is authenticated
    if (!userId) {
      // You can handle this case by redirecting to the login page or displaying a message.
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/cart/${userId}`, // Backend route
        {
          productId: _id, // The book's ID
          quantity: 1, 
        }
      );
      // Handle the response from the backend, e.g., show a success message
      console.log("Book added to cart:", response.data);

      setShowAlert(true);

      // You can also redirect the user to the cart page or display a message here
    } catch (error) {
      console.error("Error adding book to cart:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };


  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Check if the book should be displayed or not
  const shouldDisplayBook = props.book && !isDeleted;

  return shouldDisplayBook ? (
    <Card className="book-card">
      <Card.Img src={coverPage} alt={title} />
      <Card.Body style={{ display: "flex", flexDirection: "column" }}>
        <Card.Text>By {author}</Card.Text>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Genre: {genre}</Card.Text>
        <Card.Title>Price: Rs {price}</Card.Title>
                    {/* Display the alert when showAlert is true */}
                    {showAlert && (
                      <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        Product added to cart!
                      </Alert>
                    )}
                    {/* ... (remaining code) */}

        {isAdminRoute && (
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
            <Button variant="danger" onClick={deleteHandler} className="mt-auto">
              Delete
            </Button>
          </>
        )}

        {!isAdminRoute && (
          <>
            <Button variant="primary" className="mt-auto" style={{ marginBottom: "2%" }} onClick={addBookToCart}>
              Add to cart
            </Button>

            <Button
              as={Link}
              to={`/books/detail/${_id}`} // Link to the book detail page
              variant="danger"
              className="mt-auto"
            >
              More Info
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  ) : null; // Render null if there is no content (no book or book is deleted)
};

export default Book;
