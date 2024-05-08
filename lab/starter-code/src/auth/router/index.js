'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret
} = require('./handlers.js');

// Define routes
authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin); // Add basicAuth middleware before handleSignin
authRouter.get('/users', bearerAuth, handleGetUsers); // Use bearerAuth middleware for user retrieval
authRouter.get('/secret', bearerAuth, handleSecret); // Use bearerAuth middleware for accessing the secret area

module.exports = authRouter;
