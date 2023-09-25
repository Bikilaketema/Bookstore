const catchAsyncErrors = require("../middleware/catchAsyncError");
const Admin = require("../models/adminModel");
const sendToken = require("../utils/jswToken");
const Book = require('../models/bookModel');
const User =require('../models/userModel');
const bcrypt = require("bcrypt");

// Register User
const addAdmin = catchAsyncErrors(async (req, res, next) => {
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
      message: "It seems like you are not an Admin. Please don't try to access what you are not allowed to access.",
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

// Add User
const addUser = async (req, res, next) => {
  const { firstName, lastName, email, username, password, confirmPassword } = req.body;

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

  let user;
  try {
    user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
    });

  if (!user) {
    return res.status(500).json({ message: "Unable to add the user." });
  }
} catch (err) {
  console.log(err);
  return res.status(500).json({ message: "Unable to add the user." });
}
  // Send token in the response
  sendToken(res, 200, user);
};

// Delete User
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to delete." });
  }

  if (!user) {
    return res.status(404).json({ message: "Unable to delete." });
  }

  return res.status(200).json({ message: "User deleted" });
};

// Get All Users
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    // Assuming you have a "User" model defined using Mongoose
    const users = await User.find(); // Retrieve all users from the database

    res.status(200).json({
      success: true,
      users, // Include the list of users in the response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error retrieving users: ${error.message}`, // Include the error message
    });
  }
});


const addBook = async (req,res,next) => {

  const { title, author, genre, coverPage, price,description,pdfLink} = req.body;

  let book;
  try {
      book = new Book({
        title,
        author,
        genre,
        coverPage,
        price,
        description,
        pdfLink,
      });

      await book.save();
  } catch (err) {
      console.log(err);
  }

  if(!book) {
      return res.status(500).json({message:'Unable to add the book.'})
  }

  return res.status(201).json({book})
};

const addUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, username, password, confirmPassword } =
    req.body;

    let user;

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

    res.status(200).json({
      success: true,
      message: "User created!",
    });

  } catch (error) {
    console.log(error);
  }
});

const updateBook = async (req,res,next) => {
  const id = req.params.id;
  const { title, author, genre, coverPage, price, description, pdfLink} = req.body;
  let book;

  try {
      book = await Book.findByIdAndUpdate(id, {
        title,
        author,
        genre,
        coverPage,
        price,
        description,
        pdfLink,
      });
      
  } catch (err) {
      console.log(err);
  }

  if(!book) {
      return res.status(500).json({message:'Unable to update.'})
  }

  return res.status(200).json({book})
}

const deleteBook = async (req,res,next) => {
  const id = req.params.id;
  let book;
  try {
      book = await Book.findByIdAndRemove(id);
  } catch (err) {
      console.log(err)
  }

  if(!book) {
      return res.status(404).json({message:'Unable to delete.'})
  }

  return res.status(200).json({message: 'Book deleted'})
}

// Delete User Profile
const deleteUser = async (req,res,next) => {
  const id = req.params.id;
  let user;
  try {
      user = await User.findByIdAndRemove(id);
  } catch (err) {
      console.log(err)
  }

  if(!user) {
      return res.status(404).json({message:'Unable to delete.'})
  }

  return res.status(200).json({message: 'user deleted'})
}

module.exports = {
  getAllUsers,
  addAdmin,
  userLogin,
  addBook,
  addUser, 
  updateBook,
  deleteBook,
  deleteUser
};
