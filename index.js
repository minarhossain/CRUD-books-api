const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const booksHandler = require('./routeHandler/booksHandler')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// pass word = 

const port = process.env.PORT || 5000;

// data base connection with mongoose

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Connection Successful`))
    .catch(error => console.log(error));

//application route
app.use('/books', booksHandler)

// app.get('/', (req, res) => {
//     res.send("hello Books")
// })

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err })
}

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
});