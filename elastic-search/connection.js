import elastic from 'elasticsearch';
import movies from '../data/csvjson.js';


export const client = new elastic.Client({
    host: 'http://localhost:9200'
})

export const insert_data_to_elastic_search = () => {
    client.count({ index: 'movies' })
        .then(result => {
            if (result.count) {
                console.log('data found in elastic search.');
            } else {
                console.log('inserting data to elastic search.');
                client.indices.create({
                    index: 'movies'
                });
                data_feeding();
            }
        })
        .catch(err => {
            console.log('error--> ', err.message);
        })
}

const data_feeding = () => {
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

