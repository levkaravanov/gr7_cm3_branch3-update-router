const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const { loginUser, signupUser, getMe } = require("../controllers/userControllers");

// public routes
router.post("/login", loginUser);
router.post("/signup", signupUser);

// protected route
router.get("/me", requireAuth, getMe);

module.exports = router;