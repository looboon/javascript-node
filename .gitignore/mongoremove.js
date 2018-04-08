var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/' + process.argv[2];

mongo.connect(url, (err, connection) => {
    if (err) console.log(err);

    const db = connection.db();

    db.collection(process.argv[3], (err, collection) => {
        collection.remove({
            _id: process.argv[4]
        }, (err, results) => {
            if (err) console.log(err);
            connection.close()
        });
    });
})