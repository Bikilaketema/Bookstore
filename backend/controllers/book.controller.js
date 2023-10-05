const catchAsyncErrors = require("../middleware/catchAsyncError");
const bookModel = require("../models/bookModel");

//get All books
const getAllbooks = catchAsyncErrors(async (req, res, next) => {
  try {
    // Assuming you have a "User" model defined using Mongoose
    const books = await bookModel.find(); // Retrieve all users from the database

    res.status(200).json({
      success: true,
      books, // Include the list of users in the response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error retrieving the books: ${error.message}`, // Include the error message
    });
  }
});

// Get Book Details
const getBookDetails = catchAsyncErrors(async (req, res, next) => {
  const book = await bookModel.findById(req.params.id);

  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  res.status(200).json({
    success: true,
    book,
  });
});

module.exports = {
  getAllbooks,
  getBookDetails,
};