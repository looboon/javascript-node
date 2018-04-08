var mongo = require('mongodb').MongoClient;
var findAge = parseInt(process.argv[2]);

mongo.connect('mongodb://localhost:27017/learnyoumongo', (err, client) => {
    const db = client.db();
    db.collection('parrots', (err, collection) => {
        collection.find({age: {$gt: findAge}})
        .project({
            _id: 0, 
            name: 1,
            age: 1
        }).toArray((err, result) => {
            console.log(result);
            client.close();
        });
    });
});