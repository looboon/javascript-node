var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, (err, connection) => {
    const db = connection.db();
    const collection = db.collection('parrots');
    collection.count({
        age: {$gt: parseInt(process.argv[2])}
    }, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        connection.close();
    })
})