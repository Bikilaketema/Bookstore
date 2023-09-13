const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const bookRoutes = require("./routes/book.route");
const adminRoutes = require("./routes/admin.route")
const cartRoutes = require("./routes/cart.route")

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Route for accessing all books
app.get("/", (req, res) => {
  res.send("Access all books /book");
});

/* Import all routes */
app.use("/user", userRoutes); 
app.use("/book", bookRoutes); 
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);

module.exports = app;