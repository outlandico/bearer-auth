'use strict';

require('dotenv').config();

// Importing the start function from server.js
const { start } = require('./server.js');

// Start the web server
start(process.env.PORT);

// Start up DB Server
const { db } = require('./src/auth/models/index.js');

db.sync()
  .then(() => {
    // Do something after syncing
  })
  .catch(error => console.error(error));
