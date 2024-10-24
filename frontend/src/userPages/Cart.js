import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartEmptyMessage, setCartEmptyMessage] = useState(null);

  const updateCartItems = (items) => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem("userToken");

        if (!userToken) {
          console.error("User token not found in localStorage");
          setLoading(false);
          return;
        }

        const decoded = jwt_decode(userToken);
        const userId = decoded.id;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/cart/${userId}`
        );
        const data = response.data;

        if (data.error) {
          setError(data.error);
        } else if (data.items.length === 0) {
          setCartEmptyMessage("Your cart is empty");
        } else {
          setCartItems(data.items);
          updateCartItems(data.items);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Your cart is empty!");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeItem = async (bookId) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const decoded = jwt_decode(userToken);
      const userId = decoded.id;

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/cart/${userId}/${bookId}`
      );
      const updatedCart = response.data;

      setCartItems(updatedCart.items);
      updateCartItems(updatedCart.items);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <Container className="mt-5">
      <h4 className="text-center mb-4">Cart</h4>
      <Row>
        <Col xs={12} lg={12}>
          <Card
            style={{
              padding: "1%",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            {loading ? (
              <p>Loading cart items...</p>
            ) : (
              <>
                {cartItems.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h4 style={{ marginBottom: "10%" }}>Your cart is empty!</h4>
                  </div>
                ) : (
                  <div>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex align-items-center justify-content-between border rounded p-2 mb-2"
                        style={{ backgroundColor: "skyblue" }}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={item.coverPage}
                            alt={"Book cover img"}
                            width="100"
                            height="100"
                            className="mr-3"
                            style={{ borderRadius: "5px" }}
                          />
                          <div
                            className="flex-grow-1"
                            style={{ marginLeft: "2%" }}
                          >
                            <p
                              className="font-weight-bold"
                              style={{
                                fontSize: "1.2rem",
                                margin: 0,
                                maxWidth: "70%",
                                whiteSpace: "nowrap",
                                fontWeight: "bold",
                              }}
                            >
                              {item.name.length > 80
                                ? `${item.name.substring(0, 80)}...`
                                : item.name}
                            </p>
                            <p style={{ fontSize: "1rem" }}>
                              Price: ETB {item.price}
                            </p>
                            <div
                              style={{
                                maxHeight: "60px",
                                overflow: "hidden",
                                fontSize: "1rem",
                              }}
                            >
                              <p>Quantity: {item.quantity}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => removeItem(item.bookId)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <h5 className="text-center" style={{ fontSize: "1.8rem" }}>
                      Total Price: ETB {calculateTotalPrice()}
                    </h5>
                    <div className="text-center mt-3">
                      <Button variant="primary" onClick={handleCheckoutClick}>
                        Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
