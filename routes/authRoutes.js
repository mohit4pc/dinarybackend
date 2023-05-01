const express = require("express");
const { signUp, signIn, logout, userProfile } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/registration", signUp)
router.post("/sign-In", signIn)
router.get("/logout", logout)
router.get("/me", isAuthenticated, userProfile)
module.exports = router; 