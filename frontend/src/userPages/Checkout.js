import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    creditCard: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({
      ...billingInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userToken = localStorage.getItem("userToken");
    const decoded = jwt_decode(userToken);
    const userId = decoded.id;

    // To retrieve the cartItems from local storage
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (Array.isArray(storedCartItems)) {
      // Use map to extract the productId from each item
      const productIds = storedCartItems.map((item) => item.productId);

      // Create a new itemsObject with the new productIds
      const newItemsObject = { items: productIds };

      try {
        // Make a POST request to the checkout endpoint with the newItemsObject as the request body
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/checkout/${userId}`,
          newItemsObject
        );

        // Handle the response from the server (e.g., success or error)
        if (response.data.success) {
          // Clear the cart items from local storage since the checkout was successful
          localStorage.removeItem("cartItems");
          console.log("Checkout Response:", response.data);
        }
      } catch (error) {
        // Handle network errors and other unexpected errors
        // Log the error to the console for debugging
        console.error("Checkout Error:", error);
      }
    } else {
      console.error(
        "No cartItems found in local storage or the data is not an array."
      );
    }

    navigate("/dashboard");
  };

  return (
    <Container className="checkout-container">
      <h2 style={{ textAlign: "center" }}>Checkout</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={billingInfo.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={billingInfo.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={billingInfo.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="creditCard">
          <Form.Label>Credit Card:</Form.Label>
          <Form.Control
            type="text"
            name="creditCard"
            value={billingInfo.creditCard}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="expirationDate">
          <Form.Label>Expiration Date:</Form.Label>
          <Form.Control
            type="text"
            name="expirationDate"
            value={billingInfo.expirationDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="cvv">
          <Form.Label>CVV:</Form.Label>
          <Form.Control
            type="text"
            name="cvv"
            value={billingInfo.cvv}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ marginBottom: "5%", marginTop: "2%", width: "100%" }}
        >
          Place Order
        </Button>
      </Form>
    </Container>
  );
}

export default Checkout;
