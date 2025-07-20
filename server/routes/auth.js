// server/routes/auth.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Correctly import all functions from the controller
const { 
    registerUser, 
    loginUser, 
    getLoggedInUser 
} = require('../controllers/authController');

// This route is for getting the currently logged-in user's data
router.get('/user', auth, getLoggedInUser);

// These routes are for registering and logging in
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
