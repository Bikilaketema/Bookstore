const mongoose = require("mongoose");

// Define the Mongoose schema for the "book" collection
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    coverPage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pdfLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Mongoose model for the "book" collection using the bookSchema
const bookModel = mongoose.model("book", bookSchema);

// Export the bookModel to be used in other parts of the application
module.exports = bookModel;