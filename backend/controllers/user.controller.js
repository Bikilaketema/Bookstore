const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jswToken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
}).single("file");


// Register User
const signUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, username, password, confirmPassword } =
    req.body;

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

    // Send token in the response
    sendToken(res, 201, user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating the user",
      error: error.message,
    });
  }
});

// Login User
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { identifier, password } = req.body;

  // If Identifier or Password is not provided
  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in both Identifier and Password",
    });
  }

  // Find the user by email or username
  const userExists = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  if (!userExists) {
    return res.status(401).json({
      success: false,
      message: "User Not Exists! You have to Sign Up",
    });
  }

  // Compare the provided password with the stored password
  const isPasswordMatch = await bcrypt.compare(password, userExists.password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email/username or Password",
    });
  }

  // Send token in the response
  sendToken(res, 200, userExists);
});

// Get User Profile
const getProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving user",
    });
  }
});

// Update User Profile
const updateProfile = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const { firstName, lastName, email, username } = req.body;

  if (!firstName || !lastName || !email || !username) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      username,
    }, { new: true });
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unable to update." });
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

// Delete User Profile
const deleteProfile = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    console.log(err)
  }
  
  res.status(200).json({
    success: true,
    message: "User profile deleted successfully",
  });
});

// Upload User Profile Picture
const uploadProfilePicture = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Upload user profile picture here
  // You can access the uploaded file in req.file
  const profilePictureUrl = await uploadFile(req); 

  // Update user's profile picture in the database
  user.profilePicture = profilePictureUrl;
  await user.save();

  return res.status(200).json({
    success: true,
    user,
  });
});

const uploadFile = (req) => {
  return new Promise((resolve, reject) => {
    upload(req, {}, function (err) {
      if (err instanceof multer.MulterError) {
        reject(err);
      } else if (err) {
        reject(err);
      }
      
      // Everything went fine and file is uploaded
      // We will assume that our upload function will store the uploaded files in a directory named 'uploads' in the public directory and it will preserve the original name of the uploaded files.
      resolve('/uploads/' + req.file.filename);
    })
  })
};

const updatePassword = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const { password, newPassword, confirmNewPassword } = req.body;

  if (!password || !newPassword || !confirmNewPassword) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  try {
    // Compare the provided password with the stored password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt();

    // Hash the password along with the salt
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password in the database
    user.password = hashedPassword;
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the password.",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
});


module.exports = {
  getProfile,
  signUser,
  userLogin,
  deleteProfile,
  updateProfile,
  uploadProfilePicture,
  updatePassword,
};
