const express = require("express");
const { getAllUsers, addAdmin, userLogin, addBook, updateBook, deleteBook } = require("../controllers/admin.controller");

// Create an instance of Express Router for user routes
const userRoutes = express.Router();

// Define routes
userRoutes.get("/", getAllUsers); // Route for retrieving all users
userRoutes.post("/signUp", addAdmin); // Route for registering a new user
userRoutes.post("/login", userLogin); // Route for user login
userRoutes.post("/addbook", addBook); // Route for adding new books
userRoutes.put("/updatebook/:id", updateBook); // Route for updating books
userRoutes.delete("/deletebook/:id", deleteBook); // Route for deleting books


// Export the userRoutes object
module.exports = userRoutes;