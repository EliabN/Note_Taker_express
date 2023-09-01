// Import required modules and dependencies
// Create an Express Router instance
const note = require('express').Router(); 
// Import custom file system utility functions
const { readAndAppend, writeToFile } = require('../helpers/fsUtils');
// Import the uuidv4 function for generating unique IDs
const { v4: uuidv4 } = require('uuid'); 

// Import built-in Node.js modules for file system operations
// Import the util module
const util = require('util'); 
// Import the fs module for file system operations
const fs = require('fs'); 
// Promisify the fs.readFile function for asynchronous file reading
const readFromFile = util.promisify(fs.readFile); 


// GET Route for retrieving all the 
note.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
note.post('/', (req, res) => {
    console.log(req.body);
  
    // Get title and text from body
    const { title, text } = req.body;
  
    // Check if the request body exists
    if (req.body) {
      // Create a new note object
      const newNote = {
          title,
          text,
          id: uuidv4(),
      };
  
      // Return message of error
      readAndAppend(newNote, './db/db.json');
      res.json({ message: `Note added successfully`});
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

      // Return message of error
      res.json({ message: 'Note deleted successfully' });
    } else {
      res.status.json({ error: 'Note not found' });
    } 
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = note;