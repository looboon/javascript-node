var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect('mongodb://localhost:27017/learnyoumongo', (err, database) => {
    if (err) console.log(err);
    const db = database.db()
    db.collection('parrots', (err, collection) => {
        if (err) console.log(err);
        collection.find({age: {$gt: parseInt(process.argv[2])}}).toArray(function(err, documents) {
            console.log(documents);
            database.close();
        });
    });
})


