// console.log('Hello');
const express = require('express');
const path = require('path');
const api = require('./apiRoutes');
const app = express();

app.use('/api', api);

// const noteEl = document.getElementById('')
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
    
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = app;