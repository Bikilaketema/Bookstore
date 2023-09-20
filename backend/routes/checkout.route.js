const express = require("express");
const { checkout,getOwnedItems,deleteBook } = require('../controllers/checkout.controller');
const checkoutRoutes = express.Router();

checkoutRoutes.get("/:userId" ,getOwnedItems);
checkoutRoutes.post("/:userId", checkout);
checkoutRoutes.delete("/:userId/:bookId", deleteBook);

module.exports = checkoutRoutes;