import movies from '../mongodb/movie-schema.js';
import { client } from '../elastic-search/connection.js';

const limit = 10;

export const mongo_handler = async (req, res) => {

    if (req.params.page <= 0) {
        req.params.page = 1;
    }

    const count = await movies.find({}).countDocuments();
    const result = await movies.find({}).skip((req.params.page - 1) * limit).limit(limit);
    res.json({ count: count, doc: result });

}

// es means elastic search
export const es_handler = async (req, res) => {

    if (req.params.page <= 0) {
        req.params.page = 1;
    }

    const result = await client.count({ index: 'movies' });
    const response = await client.search({
        index: 'movies',
        type: 'movie',
        body: {
            size: limit,
            from: (req.params.page - 1) * limit
        }
    })

    res.json({ count: result.count, data: response.hits.hits });
}