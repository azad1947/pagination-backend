import mongoose from 'mongoose';

const { Schema } = mongoose;

export default mongoose.model('movies', new Schema({
    movieID: {
        type: Number,
        unique: true
    },
    title: String,
    genres: String
}))