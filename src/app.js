const db = require("./../db/connection");
const dataFeeding = require("./../src/dataFeeding");
const movies = require("./../schema/movieSchema");
const app = require("./server");
const client = require("../elasticSearch/connection");
const limit = 10;
db();
movies.find({}).countDocuments()
    .then(count => {
        if (!count) {
           return Promise.resolve(dataFeeding());
        } else {
            console.log('data is inserted');
        }
    })
    .catch(err => console.log(err))

app.get('/movie/:page', (req, res) => {
    movies.find({}).countDocuments().exec()
        .then(count => {
            movies.find({}).skip((req.params.page - 1) * limit).limit(limit).exec()
                .then(result => {
                    res.json({count: count, doc: result})
                }).catch(err => console.log('failed to make http request'))
        })
        .catch(err => console.log(err))
})

app.get('/movies/:page', (req, res) => {
    client.count({index: "movies"})
        .then(result => {
            client.search({
                index: 'movies',
                type: 'movie',
                body: {
                    size: limit,
                    from: (req.params.page - 1) * limit
                }
            }).then(response => res.json({count: result.count, data: response.hits.hits}))
                .catch(err => console.log('err----->', err))
        }).catch(err => console.log('err-------', err))
})
