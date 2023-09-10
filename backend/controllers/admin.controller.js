const catchAsyncErrors = require("../middleware/catchAsyncError");
const Admin = require("../models/adminModel");
const sendToken = require("../utils/jswToken");

// Register User
const signUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, username, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  // Create a new user
  const admin = await Admin.create({
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword
  });

  // Send token in the response
  sendToken(res, 201, admin);
});

// Login User
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // If Email or Password is not provided
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in both Email and Password",
    });
  }

  // Find the user by email
  const adminExists = await Admin.findOne({ email });
  if (!adminExists) {
    return res.status(401).json({
      success: false,
      message: "Admin Not Exists! You have to Sign Up",
    });
  }

  // Compare the provided password with the stored password
  const isPassword = await adminExists.comparePassword(password);

  if (!isPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  // Send token in the response
  sendToken(res, 200, adminExists);
});

// Get All Users
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "sucess route complete",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
    });
  }
});

module.exports = {
  getAllUsers,
  signUser,
  userLogin,
};
