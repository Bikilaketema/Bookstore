const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const axios = require("axios");
const multer = require("multer");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jswToken");

// Set up Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Upload User Profile Picture
const uploadProfilePicture = [
  upload.single("file"), // Middleware to handle single file uploads
  catchAsyncErrors(async (req, res) => {
    const id = req.params.id;
    let user = await User.findById(req.user.id); // Fetch user based on authenticated user id
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    try {
      const profilePictureUrl = await uploadFileToImgur(req.file);

      // Update user's profile picture in the database
      user.profilePicture = profilePictureUrl;
      await user.save();

      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Error uploading to Imgur:", error);
      return res.status(500).json({
        success: false,
        message: "Error uploading profile picture",
        error: error.message,
      });
    }
  }),
];

// Function to upload file to Imgur
const uploadFileToImgur = async (file) => {
  const url = "https://api.imgur.com/3/image";
  const formData = new FormData();

  formData.append("image", file.buffer.toString("base64")); // Convert file buffer to base64 string

  try {
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Client-ID YOUR_IMGUR_CLIENT_ID`, // Replace with your Imgur Client ID
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data.link; // Return the image link
  } catch (error) {
    throw new Error("Failed to upload image to Imgur");
  }
};

// Register User
const signUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, username, password, confirmPassword } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    !confirmPassword
  ) {
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
  const userExists = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
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
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving user",
    });
  }
});

// Update User Profile
const updateProfile = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const { firstName, lastName, email, username } = req.body;

  if (!firstName || !lastName || !email || !username) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    user = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        username,
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unable to update." });
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

// Delete User Profile
const deleteProfile = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({
    success: true,
    message: "User profile deleted successfully",
  });
});

const updatePassword = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const { password, newPassword, confirmNewPassword } = req.body;

  if (!password || !newPassword || !confirmNewPassword) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  try {
    // Compare the provided password with the stored password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt();

    // Hash the password along with the salt
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password in the database
    user.password = hashedPassword;
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the password.",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  getProfile,
  signUser,
  userLogin,
  deleteProfile,
  updateProfile,
  uploadProfilePicture,
  updatePassword,
};
