'use strict';

const express = require('express');
const router = express.Router();

// Import route handlers
const { handleSignup, handleSignin, handleGetUsers, handleSecret } = require('./handlers');

// Define routes
router.post('/signup', handleSignup);
router.post('/signin', handleSignin);
router.get('/users', handleGetUsers);
router.get('/secret', handleSecret);

module.exports = router;
