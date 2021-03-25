import mongoose from 'mongoose';

const mongo_url = 'mongodb://localhost:27017/pagination'

export default function () {
    mongoose.connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    mongoose.connection.on('connected', () => {
        console.log('connected to the db.')
    });

    mongoose.connection.on('error', (err) => {
        console.log('db connection error :- ', err)
    });

    mongoose.connection.on('disconnected', () => {
        console.log('db is disconnected.');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('db has been disconnected due to app termination.');
            process.exit(0)
        });
    });
}