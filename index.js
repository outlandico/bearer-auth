'use strict';

require('dotenv').config();

// Importing the start function from server.js
const { start } = require('./lab/starter-code/src/server.js');

// Start the web server
start(process.env.PORT);

// Start up DB Server
const { db } = require('./lab/starter-code/src/auth/models/index.js');

db.sync()
  .then(() => {
    // Do something after syncing
  })
  .catch(error => console.error(error));
