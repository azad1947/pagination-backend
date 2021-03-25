import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect_to_mongo from './mongodb/connection.js';
import insert_data_to_mongo from './mongodb/data-feeding.js';
import { insert_data_to_elastic_search } from './elastic-search/connection.js';
import { error_handler } from './routes/middleware.js';
import routes from './routes/routes.js';

const app = express();

connect_to_mongo();
insert_data_to_mongo();
insert_data_to_elastic_search();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/pagination', routes);
app.use(error_handler);

app.listen(5000, () => {
    console.log(`app is listening at port 5000.`);
});