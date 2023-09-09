import React from 'react';
import { Button } from 'react-bootstrap';

const Cart = () => {
  const cartItems = [
    { id: 1, title: 'Book 1', price: 20.99, quantity: 2 },
    { id: 2, title: 'Book 2', price: 15.49, quantity: 1 },
    { id: 3, title: 'Book 3', price: 10.00, quantity: 3 },
  ];

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mt-5" style={{paddingBottom:'5%'}}>
      <h1 style={{textAlign:'center', marginBottom:'3%'}}>My Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <p className="card-text">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="text-right">
            <h5 style={{textAlign:'center'}}>Total Price: ${calculateTotalPrice()}</h5>
            <Button className="btn btn-primary" style={{width:'100%'}}>Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
