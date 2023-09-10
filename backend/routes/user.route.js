const express = require("express");
const { getProfile, signUser, userLogin } = require("../controllers/user.controller");
const authMiddleware = require('../middleware/verifiy');

// Create an instance of Express Router for user routes
const userRoutes = express.Router();

// Define routes
userRoutes.get("/profile", authMiddleware, getProfile); // Route for retrieving all users
userRoutes.post("/signUp", signUser); // Route for registering a new user
userRoutes.post("/login", userLogin); // Route for user login

// Export the userRoutes object
module.exports = userRoutes;