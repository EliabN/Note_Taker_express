// Import express module
const express = require('express');

// Import our modular routers for /note
const noteRouter = require('./note');

// App using express
const app = express();

// Initialize note route
app.use('/note', noteRouter);

module.exports = app;

