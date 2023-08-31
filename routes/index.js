// Import express module
const express = require('express');

// Import our modular routers for /note
const noteRouter = require('./notes');

// App using express
const app = express();

// Initialize note route
app.use('/notes', noteRouter);

module.exports = app;

