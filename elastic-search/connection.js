import elastic from 'elasticsearch';
import movies from '../data/csvjson.js';
import _ from 'lodash';


export const client = new elastic.Client({
    host: 'http://localhost:9200'
})

export const insert_data_to_elastic_search = async () => {

    const index_exists = await client.indices.exists({ index: 'movies' });

    if (!index_exists) {
        client.indices.create({
            index: 'movies'
        });
    }

    client.count({ index: 'movies' })
        .then(async (result) => {
            if (result.count) {
                console.log('data found in elastic search.');
            } else {
                console.log('inserting data to elastic search.');
                await data_feeding();
            }
        })
        .catch(err => {
            console.log('error--> ', err.message);
        })

}

const data_feeding = async () => {
    const bulk = _.reduce(movies, (acc, movie) => {
        acc.push({ index: { _index: 'movies', _type: 'movie' } });
        acc.push(movie);
        return acc;
    }, []);

    client.bulk({ body: bulk }, (err, response) => {
        if (err) {
            console.log('something went wrong----> ', err);
        } else {
            console.log('data insertion completed into elastic search.')
        }
    })
}

