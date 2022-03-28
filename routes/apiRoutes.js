const api = require('express').Router();
const db = require("../db/db.json");
const uniqid = require('uniqid');

const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// unique id gen
// const uniqid = require('uniqid');
// console.log(uniqid());
api.get('/', (req, res) => {
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

api.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
        return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});


// api.get('/api/notes', (req, res) => res.json(db));
api.post('/notes', (req, res) => {

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uniqid(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.err('Error reading note')
    }
    // receive a new note to save on request body
    // add it to the db.json file
    // return new note to the client
        // Need to find a way to give each note a unique id when it's saved
});
api.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
        writeToFile('./db/db.json', result);
        res.json(`Note ${noteId} has been deleted`);
    });
});

module.exports = api;
