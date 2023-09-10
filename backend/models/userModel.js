const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minLength: [3, "password should be greater than 3 characters"],
  },
  confirmPassword: { // This field won't be saved to the database
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      // This custom validator checks that this field matches the password field
      validator: function(value) {
        return this.password === value;
      },
      message: 'Passwords do not match'
    }
  }
},
{
    timestamps: true,
});

userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt();

    // Hash the password along with our new salt
    this.password = await bcrypt.hash(this.password, salt);

    // Delete confirmPassword field
    this.confirmPassword = undefined;

    // Go to the next middleware
    next();
  } catch (err) {
    next(err);
  }
});

// Method to generate a JWT token for the user
userSchema.methods.getjwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_SECRET_KEY_EXPIRE,
  });
};

// Method to compare the user's password with a provided password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model
const UserModel = mongoose.model("user", userSchema);

//export the user Model
module.exports = UserModel;
