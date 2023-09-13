import React, { useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
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

  const addToCartHandler = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/cart/${userId}`, {
        productId: _id, // The book's _id
        quantity: 1, // You can modify this based on your requirements
      });
  
      // Handle the response as needed (e.g., show a success message)
      console.log("Added to cart:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle errors here
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
          <Button
          variant="primary"
          className="mt-auto"
          style={{ marginBottom: "2%" }}
          onClick={addToCartHandler} // Call the addToCartHandler function
        >
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
