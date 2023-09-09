const express = require("express");
const {
  loginHandler,
  registerHandler,
  logoutHandler,
} = require("../controllers/auth.contoller");
const { deserializeUser } = require("../middleware/deserializeUser");
const { requireUser } = require("../middleware/requireUser");
const { validate } = require("../middleware/validate");
const {
  createusersSchema,
  loginusersSchema,
} = require("../schema/student.schema");

const router = express.Router();

// Register can be done only by admin and we input the admin credential inside the system
// Register user route
// router.post("/register", validate(createusersSchema), registerHandler);

// Login user route
router.post("/login", validate(loginusersSchema), loginHandler);

// This is deserialze middleware it checks for user have valid session and have appropriate tokens.
router.use(deserializeUser, requireUser);

// Add student or admin
router.post("/register", validate(createusersSchema), registerHandler);

// Logout User
router.get("/logout", logoutHandler);

module.exports = router;