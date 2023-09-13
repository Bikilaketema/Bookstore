const express = require("express");
const { getCartItems, addCartItem, deleteItem } = require('../controllers/cart.controller');
const cartRoutes = express.Router();

cartRoutes.get("/:id" ,getCartItems);
cartRoutes.post("/:id", addCartItem);
cartRoutes.delete("/:userId/:bookId", deleteItem);

module.exports = cartRoutes;