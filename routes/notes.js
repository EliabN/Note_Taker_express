const note = require('express').Router();
const { readAndAppend, writeToFile } = require('../helpers/fsUtils');
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
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding tip');
    }
  }
);

// Delete Route for a new note
note.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Use await for asynchronous operations
    const data = await readFromFile('./db/db.json'); 
    const notes = JSON.parse(data);
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex !== -1) {
      // Remove the note from the array
      notes.splice(noteIndex, 1);

      // Write updated data back to the file
      await writeToFile('./db/db.json', (notes));
      console.log(notes);

      res.json({ message: 'Note deleted successfully' });
    } else {
      res.status.json({ error: 'Note not found' });
    } 
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
  });

module.exports = note;