var mongoose = require("mongoose");

function connection() {
    mongoose.connect('mongodb://localhost/pagination', {useNewUrlParser: true, useUnifiedTopology: true})
        .then((connection) => {
            console.log('we are connected---->');
        })
        .catch((error) => {
            console.log("error displaying=>", error)
        });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:--->'));
    db.once('open', function () {
        console.log('we are connected to database')
    });
}

module.exports = connection;
