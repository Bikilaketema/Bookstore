import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.error("User token not found in localStorage");
      return;
    }

    const decoded = jwt_decode(token);

    const userData = {
      username: decoded.username,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    };

    setUser(userData);
  }, []);

  const updateUserBooks = (books) => {
    setUserBooks(books);
  };

  const fetchBooksData = () => {
    // Fetch all books data from the server
    axios
      .get(`http://localhost:5000/book/`)
      .then((response) => {
        const data = response.data;
        if (data.success && Array.isArray(data.books)) {
          setBooksData(data.books);
        } else {
          console.error("Books data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching books data:", error);
      });
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const decoded = jwt_decode(userToken);
    const userId = decoded.id;

    // Fetch user books data from the server
    axios
      .get(`http://localhost:5000/checkout/${userId}`)
      .then((response) => {
        const data = response.data;
        if (data.error) {
          console.error(data.error);
        } else {
          // Update the user books state with the latest data
          updateUserBooks(data.books || []);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch books data when the component mounts
    fetchBooksData();
  }, []);

  const handleDeleteBook = (bookId) => {
    const userToken = localStorage.getItem("userToken");
    const decoded = jwt_decode(userToken);
    const userId = decoded.id;
  
    axios
      .delete(`http://localhost:5000/checkout/${userId}/${bookId}`)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          // Remove the deleted bookId from the userBooks state immediately
          const updatedUserBooks = userBooks.filter((id) => id !== bookId);
          updateUserBooks(updatedUserBooks);
          console.log("Book deleted successfully");
        } else {
          console.error("Failed to delete book:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };
  

  return (
    <Container>
      <Row>
        {/* Left Column: User Information */}
        <Col md={4}>
          <h2>User Dashboard</h2>
          {user && (
            <div>
              <h3>User Information</h3>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
            </div>
          )}
        </Col>

        {/* Right Column: User Books */}
        <Col md={8}>
        <h3>Your Books</h3>
        <ul className="list-unstyled">
          {userBooks.map((userBookId, index) => {
            const book = booksData.find((bookData) => bookData._id === userBookId);
            const listItemStyle = {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "10px 0",
              position: "relative", // Add this to position the button relative to the list item
            };
            const imageStyle = {
              Width: "120px",
              maxHeight: "80px",
              marginRight:"2%"
            };
            const titleStyle = {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: "1", // Allow the title to take available space
            };
            const buttonStyle = {
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
            };

            return (
              <li key={index} style={listItemStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={book ? book.coverPage : ""}
                    alt={book ? book.title : ""}
                    className="img-thumbnail mr-3"
                    style={imageStyle}
                  />
                  <p className="mb-0" style={titleStyle}>
                    {book ? book.title : "Book not found"}
                  </p>
                </div>
                <div style={buttonStyle}>
                  <Button
                    variant="danger"
                   onClick={() => handleDeleteBook(book._id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Col>
    </Row>
    </Container>
  );
};


export default UserDashboard;
