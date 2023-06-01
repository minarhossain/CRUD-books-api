const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: String,
    publishedYear: {
        type: Date,
        default: Date.now,
    },

});

module.exports = bookSchema;