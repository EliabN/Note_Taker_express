const note = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

const util = require('util');
const fs = require('fs');
const readFromFile = util.promisify(fs.readFile);

// GET Route for retrieving all the 
note.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
note.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
          title,
          text,
          id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Tip added successfully`);
    } else {
      res.error('Error in adding tip');
    }
  }
);

// POST Route for a new note
note.delete('/', (req, res) => {
  res.send('Got a DELETE request at /user')
})

module.exports = note;