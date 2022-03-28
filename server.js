const express = require('express');
const path = require('path');

const htmlRoutes = require('./routes/htmlRoutes.js');
const PORT = process.env.PORT || 3004;

const app = express();
const db = require('./db/db.json');
// app.use(api);
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(express.static('public'));

app.use(htmlRoutes);

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);



app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// console.log(uniqid);