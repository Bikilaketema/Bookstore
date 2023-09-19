const express = require("express");
const {
  getProfile,
  signUser,
  userLogin,
  deleteProfile,
  updateProfile,
  uploadProfilePicture,
  updatePassword,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/verifiy");

// Create an instance of Express Router for user routes
const userRoutes = express.Router();

// Define routes
userRoutes.get("/profile/:id", authMiddleware, getProfile); // Route for retrieving users data or profile
userRoutes.post("/signUp", signUser); // Route for registering a new user
userRoutes.post("/login", userLogin); // Route for user login
userRoutes.put("/profile/:id", authMiddleware, updateProfile); // Route for updating user profile (optional)
userRoutes.delete("/profile/:id", authMiddleware, deleteProfile); // Route for deleting user profile (optional)
userRoutes.post("/profile/:id", authMiddleware, uploadProfilePicture); // Route for uploading user profile picture (optional)
userRoutes.put('/profile/:id/password', authMiddleware, updatePassword); // Route for updating user password (optional)

// Export the userRoutes object
module.exports = userRoutes;