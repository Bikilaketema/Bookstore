const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require('../models/userModel'); // Import your User model
const Cart = require('../models/cartModel');

const checkout = catchAsyncErrors(async (req, res) => {
    const userId = req.params.userId;
    const { items } = req.body; // Assuming you send an array of book IDs in the request body
  
    try {
      console.log("Checkout request received with userId:", userId, "items:", items);
  
      // Find the user by ID
      const user = await User.findById(userId);
      let cart = await Cart.findOne({userId});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Initialize a message to track books that were already in the user's collection
      const alreadyOwnedBooks = [];
  
      for (const itemId of items) {
        // Check if the book is already in the user's collection
        if (user.books.includes(itemId)) {
          alreadyOwnedBooks.push(itemId);
        } else {
          // Add the book ID to the user's "books" property
          user.books.push(itemId);
        }
      }
  
      // Save the updated user document
      await user.save();
      const data = await Cart.findByIdAndDelete({_id:cart.id});
  
      let message = 'Items added to your books successfully.';
      if (alreadyOwnedBooks.length > 0) {
        message += ` The following books are already in your collection: ${alreadyOwnedBooks.join(', ')}`;
      }
  
      res.status(200).json({ message });
    } catch (error) {
      console.error('Error during checkout:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  const getOwnedItems = catchAsyncErrors(async (req, res) => {
    try {
      const userId = req.params.userId; // Extract the user ID from the URL parameter
      // Fetch user data from your MongoDB database
      // Assuming you have a User model, you can use Mongoose to fetch the user
      // Replace the following line with your database query
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the "books" property is empty or not present
      if (!user.books || user.books.length === 0) {
        return res.status(404).json({ message: "You didnot add any book to a cart." });
      }
  
      // Send just the "books" property as a JSON response
      res.json({ books: user.books });
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const deleteBook = catchAsyncErrors( async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookId = req.params.bookId;
    
        // Find the user by userId
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Check if the bookId exists in the user's books array
        if (!user.books.includes(bookId)) {
          return res.status(404).json({ message: 'Book not found in user\'s library' });
        }
    
        // Remove the bookId from the user's books array
        user.books.pull(bookId);
        
        // Save the updated user document
        await user.save();
    
        return res.json({ message: `Successfully deleted the book: ${bookId}` });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
  });
  
  
  
  

  module.exports = {
    checkout,
    getOwnedItems,
    deleteBook,
  };