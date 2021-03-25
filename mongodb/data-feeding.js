import _ from 'lodash';
import data from '../data/csvjson.js';
import movies from './movie-schema.js';

const data_feeding = async (data) => {
    _.each(data, async (doc) => {
        let document = new movies({
            movieID: _.get(doc, 'movieId'),
            title: _.get(doc, 'title'),
            genres: _.get(doc, 'genres')
        });
        await document.save();
    })
}

export default function () {
    movies.find({}).countDocuments()
        .then(async (count) => {
            if (!count) {
                console.log('inserting data into mongo.');
                await data_feeding(data);
                console.log('data insertion into mongo completed.');
            } else {
                console.log('data found into mongo.');
            }
        })
        .catch(err => {
            console.log('error---> ', err.message);
        })
}
