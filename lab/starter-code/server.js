'use strict';

const express = require('express');
const cors = require('cors');

const handleErrors = require('./middleware/500.js');
const handleNotFound = require('./middleware/404.js');

const authRoutes = require('./auth/routes.js');
const { basicAuth } = require("./auth/middleware/basicAuth.js");
const { bearerAuth } = require("./auth/middleware/bearerAuth.js");

// Prepare the app
const app = express();
app.use(cors());

// Configure the app to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// INTERNAL ROUTES
app.use('/auth', authRoutes);

app.get('/', (request, response) => {
    response.status(200).send("I am working");
});

// Use basic authentication middleware for this route
app.get('/test-basic', basicAuth, (request, response) => {
    response.status(200).send("Basic route works!");
});

// Use bearer authentication middleware for this route
app.get('/test-bearer', bearerAuth, (request, response) => {
    response.status(200).send("Bearer route works!");
});

// Handle 404 errors
app.use("*", handleNotFound);
// Handle other errors
app.use(handleErrors);

module.exports = {
    server: app,
    start: (port) => {
        app.listen(port, () => console.log(`Listening on ${port}`));
    }
};