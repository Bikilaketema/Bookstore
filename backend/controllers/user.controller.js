const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jswToken");
const bcrypt = require("bcrypt");

// Register User
const signUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, username, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt();

    // Hash the password along with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword, // Store the hashed password
    });

    // Send token in the response
    sendToken(res, 201, user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating the user",
      error: error.message,
    });
  }
});


// Login User
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { identifier, password } = req.body;

  // If Identifier or Password is not provided
  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in both Identifier and Password",
    });
  }

  // Find the user by email or username
  const userExists = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
  if (!userExists) {
    return res.status(401).json({
      success: false,
      message: "User Not Exists! You have to Sign Up",
    });
  }

  // Compare the provided password with the stored password
  const isPasswordMatch = await bcrypt.compare(password, userExists.password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email/username or Password",
    });
  }

  // Send token in the response
  sendToken(res, 200, userExists);
});

// Get User Profile
const getProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    // Assuming the user's ID is stored in req.user.id
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user",
    });
  }
});


module.exports = {
  getProfile,
  signUser,
  userLogin
};
