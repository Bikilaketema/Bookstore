import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  
  const [userBooks, setUserBooks] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooksData = () => {
    // Fetch all books data from the server
    axios
      .get(`http://localhost:5000/book/`)
      .then((response) => {
        const data = response.data;
        if (data.success && Array.isArray(data.books)) {
          setBooksData(data.books);
          setLoading(false);
        } else {
          console.error("Books data is not an array:", data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching books data:", error);
        setLoading(false);
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
          setUserBooks(data.books || []);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch books data when the component mounts
    fetchBooksData();
  }, []);

  const navigate = useNavigate();

  const handleBuy = () => {
    navigate('/books');
  };

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
          setUserBooks((prevUserBooks) => prevUserBooks.filter((id) => id !== bookId));
        }
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });

  };
  


  return (
    <Container>
      <Row>
        {/* Right Column: User Books */}
        <Col md={12}>
    
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '110vh', maxHeight:"110vh" }}>
            {loading ? (
              <div style={{textAlign: "center"}}>
                <h3>Loading...</h3>
              </div>
            ) : userBooks.length === 0 ? (
              <div style={{display:"flex",flexDirection:"column",justifyConetnt:"center", alignItems: "center"}}>
                <h4 style={{marginBottom:"10%"}}>You don't have any books. Please buy some.</h4>
                <Button variant="primary" style={{height:"80px", fontSize:"40px"}} onClick={handleBuy}>Buy Books</Button>
              </div>
            ) : (
              <ul className="list-unstyled">
              <h3 style={{ textAlign: "center" }}>Your Books</h3>
              {userBooks.map((userBookId, index) => {
                const book = booksData.find((bookData) => bookData._id === userBookId);
                  const listItemStyle = {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "10px 0",
                    position: "relative",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "skyblue",
                  };
                  const imageStyle = {
                    width: "120px",
                    maxHeight: "80px",
                    marginRight: "2%",
                    borderRadius: "5px",
                  };
                  const titleStyle = {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: "1",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  };
                  const buttonStyle = {
                    position: "absolute",
                    right: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                    marginRight: "4%"
                  };
    
                  return (
                    <li key={index} style={listItemStyle}>
                      <div style={{ display: "flex", alignItems: "center", width:"100%"}}>
                        <img
                          src={book ? book.coverPage : ""}
                          alt={book ? book.title : ""}
                          className="img-thumbnail mr-3"
                          style={imageStyle}
                        />
                        <div style={{width:"70%"}}>
                          <p className="mb-0" style={titleStyle}>
                            {book ? (book.title.length > 80 ? `${book.title.substring(0, 80)}...` : book.title) : "loading"}
                          </p>
                        </div>
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
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
