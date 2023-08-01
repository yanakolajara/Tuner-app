const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

const songsController = require('./controllers/songController')
const app = express();

app.use(express.json());
app.use(cors())
app.use(morgan('dev'));
app.use('/songs', songsController)

app.get('/', (req,res) => {
    res.send("Welcome to Tuner")
})

app.get('*', (req,res) => {
    res.status(404).send("Page not found")
})

module.exports = app;