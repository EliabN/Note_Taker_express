const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
//const api = require('./routes/index.js');
const { readAndAppend } = require('./helpers/fsUtils');

const util = require('util');
const fs = require('fs');
const readFromFile = util.promisify(fs.readFile);

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);
//app.use('/api', api);





// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>  
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for retrieving all the 
app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
app.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
          title,
          text,
          //id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Tip added successfully`);
    } else {
      res.error('Error in adding tip');
    }
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
