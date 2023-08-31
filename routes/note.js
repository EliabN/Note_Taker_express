const note = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');

const util = require('util');
const fs = require('fs');
const readFromFile = util.promisify(fs.readFile);

// GET Route for retrieving all the 
note.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = note;