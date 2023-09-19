const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const expireTime=process.env.JWT_SECRET_KEY_EXPIRE // 1h

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "please enter email"],
      unique: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },
    profilePicture: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter a password"],
      minLength: [3, "password should be greater than 3 characters"],
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Method to generate a JWT token for the user
userSchema.methods.getjwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: expireTime,
    }
  );
};

userSchema.methods.updatePassword = async function (newPassword) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(newPassword, salt);
  await this.save();
};


// Create the User model
const UserModel = mongoose.model("user", userSchema);

//export the user Model
module.exports = UserModel;
