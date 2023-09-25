const express = require("express");
const { getAllUsers, addAdmin, userLogin, addBook, updateBook, deleteBook, deleteUser, addUser } = require("../controllers/admin.controller");
// Create an instance of Express Router for user routes
const adminRoutes = express.Router();


// Define routes
adminRoutes.get("/", getAllUsers); // Route for retrieving all users
adminRoutes.post("/signUp", addAdmin); // Route for registering a new user
adminRoutes.post("/login", userLogin); // Route for user login
adminRoutes.post("/addbook", addBook); // Route for adding new books
adminRoutes.post("/adduser", addUser); // Route for adding new users
adminRoutes.put("/updatebook/:id", updateBook); // Route for updating books
adminRoutes.delete("/deletebook/:id", deleteBook); // Route for deleting books
adminRoutes.delete("/deleteuser/:id", deleteUser); // Route for deleting user profile 


// Export the userRoutes object
module.exports = adminRoutes;