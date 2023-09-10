const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { MONGODB_URI } = process.env;
const router = require('./routes/bookRoutes')
const cors = require('cors'); // Import the cors package

const app = express();

// Enable CORS for all routes
app.use(cors());

//middlewares
app.use(express.json())
app.use('/books',router);


mongoose.connect(MONGODB_URI
  ).then(()=> console.log("Connected to the DB Successfully!")
  ).then(()=> {
    app.listen(5000)
  }).catch((err) => console.log(err));

// Continue with your application setup and logic here
