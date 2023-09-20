const catchAsyncErrors = require("../middleware/catchAsyncError");
const Cart = require('../models/cartModel');
const Book = require('../models/bookModel');

const getCartItems = catchAsyncErrors(async (req,res) => {
    const userId = req.params.id;
    try{
        let cart = await Cart.findOne({userId});
        if(cart && cart.items.length>0){
            res.send(cart);
        }
        else{
            res.status(200).send("Your cart is empty");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

const addCartItem = catchAsyncErrors(async (req, res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;
  
    try {
      console.log("Request received with userId:", userId, "productId:", productId, "quantity:", quantity);
  
      let cart = await Cart.findOne({ userId });
      console.log("Cart found:", cart);
  
      let book = await Book.findOne({ _id: productId });
      console.log("Book found:", book);
  
      if (!book) {
        console.log("Book not found, returning 404 response.");
        return res.status(404).send('Item not found!');
      }
  
      const price = book.price;
      const name = book.title;
      const coverPage = book.coverPage;
  
      if (cart) {
        let itemIndex = cart.items.findIndex((p) => p.productId == productId);
  
        if (itemIndex > -1) {
          let productItem = cart.items[itemIndex];
          productItem.quantity += quantity;
          cart.items[itemIndex] = productItem;
        } else {
          cart.items.push({ productId, name,coverPage, quantity, price });
        }
        cart.bill += quantity * price;
        cart = await cart.save();
        console.log("Updated cart:", cart);
        return res.status(201).send(cart);
      } else {
        const newCart = await Cart.create({
          userId,
          items: [{ productId, name,coverPage, quantity, price }],
          bill: quantity * price,
        });
        console.log("New cart created:", newCart);
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Something went wrong");
    }
  });
  

const deleteItem = catchAsyncErrors(async (req,res) => {
    const userId = req.params.userId;
    const bookId = req.params.itemId;
    try{
        let cart = await Cart.findOne({userId});
        let itemIndex = cart.items.findIndex(p => p.bookId == bookId);
        if(itemIndex > -1)
        {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity*productItem.price;
            cart.items.splice(itemIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});


module.exports = {
    getCartItems,
    addCartItem,
    deleteItem,
  };

