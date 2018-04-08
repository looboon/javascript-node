var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, (err, connection) => {
    const db = connection.db();
    db.collection('prices', (err, collection) => {
        if (err) console.log(err);
        collection.aggregate([
            {$match: {size: process.argv[2]}},
            {$group: {
                _id: null,
                average: {
                    $avg: '$price'
                }
            }}
        ]).toArray((err, results) => {
            if (err) console.log(err);
            console.log(Number(results[0].average).toFixed(2));
            connection.close();
        })
    })
})