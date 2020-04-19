const data = require("../db/csvjson (1).json");
const movies = require("../schema/movieSchema");
const _ = require("lodash");

function dataFeeding() {
    _.each(data, doc => {
        let document = new movies({
            movieID: _.get(doc, 'movieId'),
            title: _.get(doc, 'title'),
            genres: _.get(doc, 'genres')
        });
        document.save()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    })
}

module.exports = dataFeeding;
