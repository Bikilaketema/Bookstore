const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const generator = require("generate-password");
const Book = require("./book");
const usersSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    role: { type: String, default: "user" },
    photo: { type: String, default: "default.png" },
    password: { type: String },
    cart: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    purchases: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: { type: Number, required: true },
        purchaseDate: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Automatically run and hash the password
usersSchema.pre("save", async function (next) {
  this.id = this._id;

  // Hash password if the password is new or was updated
  if (!this.isModified("password")) return;

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

usersSchema.methods.comparePasswords = async function (
  hashedPassword,
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

usersSchema.methods.addToCart = function (bookId, quantity = 1) {
  // Find index of book in cart
  const bookIndex = this.cart.findIndex((item) => item.book.equals(bookId));

  if (bookIndex === -1) {
    // Book not in cart, add new item
    this.cart.push({ book: bookId, quantity });
  } else {
    // Book already in cart, update quantity
    this.cart[bookIndex].quantity += quantity;
  }

  return this.save();
};

usersSchema.methods.removeFromCart = function (bookId) {
  // Find index of book in cart
  const bookIndex = this.cart.findIndex((item) => item.book.equals(bookId));

  if (bookIndex !== -1) {
    // Book found in cart, remove item
    this.cart.splice(bookIndex, 1);
  }

  return this.save();
};

usersSchema.methods.updateCartQuantity = function (bookId, quantity) {
  // Find index of book in cart
  const bookIndex = this.cart.findIndex((item) => item.book.equals(bookId));

  if (bookIndex !== -1) {
    // Book found in cart, update quantity
    this.cart[bookIndex].quantity = quantity;
  }

  return this.save();
};

usersSchema.methods.purchaseCart = async function () {
  // Loop through all items in cart
  for (const item of this.cart) {
    // Add item to purchases
    this.purchases.push({
      book: item.book,
      quantity: item.quantity,
      purchaseDate: Date.now(),
    });

    // Decrement stock of book
    await Book.findByIdAndUpdate(item.book, {
      $inc: { stock: -item.quantity },
    });
  }

  // Clear cart
  this.cart = [];

  return this.save();
};

// register -> create -> email -> pre middleware -> hash -> database

// login -> user(password),database(passoword)->compare->true/false;

// login -> accesstoken,refreshtoken, loginIn

const userModel = mongoose.model("user", usersSchema);

module.exports = userModel;