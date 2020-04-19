const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movies = mongoose.model('movies', new Schema({
    movieID: {
        type: Number,
        unique: true
    },
    title: String,
    genres: String
}))

module.exports = movies;
